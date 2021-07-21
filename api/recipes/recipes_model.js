const db = require('../data/db-config')


//GET ALL RECIPES
const getRecipes = async (recipe_id) => {

    const results = await db({r: 'recipes'})
        .join({u: 'users'}, 'r.user_id', 'u.user_id') //join with user table to get the username of user who submitted recipe
        .join({i: 'images'}, 'r.image_id', 'i.image_id') //join with 'images' table to get the url for the image
        .join({c: 'categories'}, 'r.category_id', 'c.category_id') //join with 'categories' to get the recipe category
        .join({ri: 'recipes_ingredients'}, 'r.recipe_id', 'ri.recipe_id') //join with 'recipes_ingredients' for corresponding ingredient ids and quantity
        .leftJoin({ig: 'ingredients'}, 'ri.ingredient_id', 'ig. ingredient_id') //join with 'ingredients' for ingredient name
        .leftJoin({in: 'instructions'}, 'r.recipe_id', 'in.recipe_id') //join with 'instructions' for instruction and step number
        .modify(function(filterRecipes){
            if(recipe_id){
                filterRecipes.where('r.recipe_id',recipe_id)
            }
        }) //If recipe id given as parameter then filter recipes
        .select(
            'r.recipe_id',
            'r.recipe_name',
            'r.recipe_description',
            'r.recipe_source',
            'u.user_id',
            'u.user_username as submitted_by',
            'i.image_source',
            'c.category_name',
            'ig.ingredient_name',
            'ri.quantity',
            'in.step_number',
            'in.instruction'
            )

        /*
        Reduce the results down, so each recipe has an array of ingredients and an array of instructions
        */
        let newResults = results.reduce((acc, current) => {
            let temp = acc.find( recipe => recipe.recipe_id === current.recipe_id) //Find recipe matching the current recipe_id

            //If can't find the recipe add the empty ingredients and instructions array
            if(!temp) {
                acc.push(temp = {
                    ...current, 
                    ingredients: [],
                    instructions: []
                })
            }

            //Check to see if current ingredient is already in the ingredients array. If not, then push ingredient.
            if(!temp.ingredients.find(ingredient => ingredient.ingredient === current.ingredient_name)){
                temp.ingredients.push({
                    ingredient: current.ingredient_name,
                    quantity: current.quantity
                })
            }

            //Check to see if current instruction is already in the instructions array. If not then, push instruction.
            if(!temp.instructions.find(instruction => instruction.step_number === current.step_number)){
                temp.instructions.push({
                    instruction: current.instruction,
                    step_number: current.step_number
                })
            }

            return acc
            }, [])

         
        // Reverse the order of instructions array, so they are in ascending order
        newResults = newResults.map(recipe => {
            return {
                ...recipe,
                instructions: [...recipe.instructions].reverse()
            }
        })
        
        // Remove the remaining ingredient_name, quantity, instruction, and step_number from each recipe
        newResults = newResults.map(({
            ingredient_name, 
            quantity,
            instruction,
            step_number, 
            ...rest }) => rest)
    

    if(recipe_id){
        return newResults[0]
    } else {
        return newResults
    }
}

//ADD RECIPE

const addRecipe = async (recipe) => {

    //Add image and get image id
    const [imageID] = await db('images')
        .insert({
            image_source: recipe.image_source
        },'image_id')

    //Add recipe and get recipe id
    const [rID] = await db('recipes')
        .insert({
            recipe_name: recipe.recipe_name,
            recipe_description: recipe.recipe_description,
            recipe_source: recipe.recipe_source,
            user_id: recipe.user_id,
            image_id: imageID,
            category_id: recipe.category_id
        }, 'recipe_id')

    //Add each ingredient to the ingredient table, then get id, and add to recipes_ingredients table with the corresponding quantity

    const ingredients = recipe.ingredients

    for (const ingredient of ingredients) {

        //Check if ingredient exists in ingredient table 
        
        //Add ingredient and get ingredient_id
        const [ingredientID] = await db('ingredients')
            .insert({
                ingredient_name: ingredient.ingredient_name
            }, 'ingredient_id')

        //Insert recipe, ingredient and quantity into recipes_ingredients junction table
        await db('recipes_ingredients')
            .insert({
                recipe_id: rID,
                ingredient_id: ingredientID,
                quantity: ingredient.quantity
            })
      }

    //Add each instruction to the instructions table
    
    const instructions = recipe.instructions

    for (const instruction of instructions){

        await db('instructions')
            .insert({
                instruction: instruction.instruction,
                step_number: instruction.step_number,
                recipe_id: rID
            })

    }
    
    return getRecipes(rID)

}

//UPDATE RECIPE

const updateRecipe = async (recipeID, change) => {
    //Get recipe by recipeID
    const originalRecipe = await getRecipes(recipeID)

    //Check if image has changed, if yes then update
    if(originalRecipe.image_source !== change.image_source){
        
        const [imageID] = await db('images')
            .insert({
                image_source: change.image_source
            }, 'image_id')

        await db('recipes')
            .where('recipe_id',recipeID)
            .update({image_id: imageID})
    }

    //Update main recipe details if anything changed
    await db('recipes')
        .where('recipe_id', recipeID)
        .update({
            recipe_name: change.recipe_name,
            recipe_description: change.recipe_description,
            recipe_source: change.recipe_source,
            user_id: change.user_id,
            category_id: change.category_id
        })

    //For each ingredient in change check to see if exists in the original recipe

    const newIngredients = change.ingredients
    const originalIngredients = originalRecipe.ingredients

    //Check to see if new ingredients in original recipe's ingredient list
    for (const ingredient of newIngredients){
        
        let current = originalIngredients.find(o => o.ingredient === ingredient.ingredient_name)

        //If it isn't in the list add ingredient, get the ingredient_id and add to recipes_ingredients
        if(!current){
            
            const [ingredientID] = await db('ingredients')
                .insert({
                    ingredient_name: ingredient.ingredient_name
                }, 'ingredient_id')

            await db('recipes_ingredients')
                .insert({
                    recipe_id: recipeID,
                    ingredient_id: ingredientID,
                    quantity: ingredient.quantity
                })
        }
        
        //Otherwise, update the quantity of of ingredient with most recent
        else {
            const [result] = await db('ingredients')
                .select('*')
                .where('ingredient_name', ingredient.ingredient_name)
            
            await db('recipes_ingredients')
                .where('recipe_id', recipeID)
                .andWhere('ingredient_id', result.ingredient_id)
                .update({ quantity: ingredient.quantity})
        }
    }

    //Check to see if originalIngredients are in newIngredients, if not it means they've been deleted and should be removed from recipes_ingredients

    for (const ing of originalIngredients){
        let exists = newIngredients.find(n => n.ingredient_name === ing.ingredient)

        if(!exists){
            
            const [result] = await db('ingredients')
                .select('*')
                .where('ingredient_name', ing.ingredient)
            
            await db('recipes_ingredients')
                .where('recipe_id', recipeID)
                .andWhere('ingredient_id', result.ingredient_id)
                .del()
        }
    }

    //Check instructions
    const originalInstructions = originalRecipe.instructions
    const newInstructions = change.instructions

    //check to see if new instruction is in original instructions, if not add it

    for (const instruction of newInstructions){
        let exists = originalInstructions.find(o => o.instruction === instruction.instruction)

        //if doesn't exist create it
        if(!exists){
            await db('instructions')
                .insert({
                    instruction: instruction.instruction,
                    step_number: instruction.step_number,
                    recipe_id: recipeID
                })
        }

        //if it does exist, update step_number
        else {
            const [result] = await db('instructions')
                .select('*')
                .where('instruction', instruction.instruction)

            await db('instructions')
                .where('instruction_id', result.instruction_id)
                .update({
                    step_number: instruction.step_number
                })
        }
    }

    //Check to see if originalInstructions are in newInstructions, if not it means they've been deleted and should be removed from instructions

    for (const instruction of originalInstructions){
        let exists = newInstructions.find(n => n.instruction === instruction.instruction)

        if(!exists){
            await db('instructions')
                .where('instruction', instruction.instruction)
                .del()
        }
    }



    return getRecipes(recipeID)
}

//DELETE RECIPE

const removeRecipe = async (recipe_id) => {
    await db('recipes')
        .where({ recipe_id })
        .del()
}

//ADD RECIPE TO MyList

const getMyList = async (userID) => {
    
    //Get the ids of recipes in the users list
    const results = await db('users_recipes')
        .where('user_id', userID)
        .select('*')

    let myList = []

    for (const recipe of results){
        const result = await getRecipes(recipe.recipe_id)
        myList.push(result)
    }

    return myList

}

const addToMyList = async (userID, recipeID) => {

    await db('users_recipes')
        .insert({
            user_id: userID,
            recipe_id: recipeID
        })
    
    return 'added to list'
}

const removeFromMyList = async (userID, recipeID) => {
    await db('users_recipes')
        .where('user_id', userID)
        .andWhere('recipe_id', recipeID)
        .del()
    
    return 'recipe remove from list'
}


module.exports = {
    getRecipes,
    addRecipe,
    updateRecipe,
    removeRecipe,
    getMyList,
    addToMyList,
    removeFromMyList
}
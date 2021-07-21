const recipes = require('./recipes_model')


const validateRecipe = ( req, res, next) => {

    try {
        if(!req.body){
            return res.status(400).json({
                message: 'missing recipe data'
            })
        }

        if(!req.body.recipe_name){
            return res.status(400).json({
                message: 'missing recipe name'
            })
        }

        if(!req.body.recipe_description){
            return res.status(400).json({
                message: 'missing recipe description'
            })
        }

        if(!req.body.recipe_source){
            return res.status(400).json({
                message: 'missing recipe source'
            })
        }

        if(!req.body.user_id){
            return res.status(400).json({
                message: 'missing user id'
            })
        }

        if(!req.body.category_id){
            return res.status(400).json({
                message: 'missing recipe category id'
            })
        }

        next()
    } catch(err){
        next(err)
    }
}


const validateRecipeID = async ( req, res, next) => {
    try{
        const result = await recipes.getRecipes(req.params.id)
        if(!result){
            return res.status(401).json({
                message: 'recipe does not exist'
            })
        }

        //pass the username to the next 
        req.user_id = result.user_id

        next()

    } catch(err){
        next(err)
    }
}

const restrictEditing = async ( req, res, next ) => {
    try {
        //if the current user_username from token does not equal reicpe_userID restrict
        if(req.token.user_id !== req.user_id){
            return res.status(401).json({
                message: 'you do not have permission to edit this recipe'
            })
        }

        next()

    } catch(err) {
        next(err)
    }
}

module.exports = {
    validateRecipe,
    validateRecipeID,
    restrictEditing
}
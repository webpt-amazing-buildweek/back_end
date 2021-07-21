const express = require('express')
const recipes = require('./recipes_model')
const { validateRecipe, validateRecipeID, restrictEditing } = require('./recipes_middleware')

const router = express.Router()

//GET ALL RECIPES
router.get('/', async ( req, res, next ) => {
    try {
        const results = await recipes.getRecipes()
        res.status(200).json(results)
    }
    catch (err){
        next(err)
    }
})

//GET MyList

router.get('/my-list', async (req, res, next ) => {
    try {
        const result = await recipes.getMyList(req.token.user_id)
        res.status(200).json(result)
    } catch(err){
        next(err)
    }
})


//[POST] Recipe to MYLIST
router.post('/my-list/:id', validateRecipeID, async ( req, res, next ) => {
    try {
        const result = await recipes.addToMyList(req.token.user_id, req.params.id)
        res.status(201).json(result)
    } catch(err){
        next(err)
    }
})

//REMOVE recipe from myList

router.delete('/my-list/:id', validateRecipeID, async ( req, res, next ) => {
    try {
        const result = await recipes.removeFromMyList(req.token.user_id, req.params.id)
        res.status(200).json(result)

    } catch(err){
        next(err)
    }
})


//GET RECIPE BY ID
router.get('/:id/', validateRecipeID, async ( req, res, next) => {
    try {
        const results = await recipes.getRecipes(req.params.id)
        res.status(200).json(results)
    }
    catch (err){
        next(err)
    }
})

//ADD RECIPE
router.post('/', validateRecipe, async ( req, res, next) => {
    try {
        const result = await recipes.addRecipe(req.body)
        res.status(201).json(result)
    } catch(err){
        next(err)
    }
})

//UPDATE RECIPE

router.put('/:id/', validateRecipeID, restrictEditing, validateRecipe, async ( req, res, next ) => {
    try  {
        const result = await recipes.updateRecipe(req.params.id, req.body)
        res.status(200).json(result)
    } catch(err){
        next(err)
    }
})

//DELETE RECIPES

router.delete('/:id/', validateRecipeID, restrictEditing, async ( req, res, next ) => {
    try {
        await recipes.removeRecipe(req.params.id)
        res.status(200).json({
            message: 'recipe successfully deleted'
        })
    } catch(err){
        next(err)
    }
})



module.exports = router
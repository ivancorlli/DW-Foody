const repository = require('../model/recipeRepository')

const getAllRecipes = (req, res) => {
    return res.json(repository.get())
  };
  
  const createRecipe = (req, res) => {
    const body = req.body
    if (!body.id) return res.json({ ok: false, error: "Id Required" })
    if (!body.title) return res.json({ ok: false, error: "Title Required" })
    if (!body.category) return res.json({ ok: false, error: "Category Required" })
    if (!body.description) return res.json({ ok: false, error: "Description Required" })
  
    const newRecipe= {
      id: body.id,
      title: body.title,
      category: body.category,
      description: body.description
    }
    repository.create(newRecipe)
    return res.json("Ok")
  };
  
  const getRecipeById = (req, res) => {
    const id = req.params.id
    if (!id) return res.json({ ok: false, error: "Id required" })
    const data = repository.get()
    return res.json(data.find(x => x.id === id))
  };
  
  const updateRecipe = (req, res) => {
    const id = req.params.id
    if (!id) return res.json({ ok: false, error: "Id required" })
    const body = req.body
    if (!body.id) return res.json({ ok: false, error: "Id Required" })
    if (!body.title) return res.json({ ok: false, error: "Title Required" })
    if (!body.category) return res.json({ ok: false, error: "Category Required" })
    if (!body.description) return res.json({ ok: false, error: "Description Required" })
    const newRecipe= {
        id: body.id,
        title: body.title,
        category: body.category,
        description: body.description
      }
    repository.delete(id)
    repository.create(newRecipe)
    return res.json("Updated")
  };
  
  const deleteRecipe = (req, res) => {
    const id = req.params.id
    if (!id) return res.json({ ok: false, error: "Id required" })
    repository.delete(id)
    res.json(`Deleted ${req.params.id}`);
  };
  
  module.exports = {
    getAllRecipes,
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
  };

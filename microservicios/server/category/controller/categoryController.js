const repository = require('../model/categoryRepository')

const getAllCategories = (req, res) => {
    return res.json(repository.get())
  };
  
  const createCategory = (req, res) => {
    const body = req.body
    if (!body.id) return res.json({ ok: false, error: "Id Required" })
    if (!body.name) return res.json({ ok: false, error: "Name Required" })
  
    const newCat= {
      id: body.id,
      name: body.name,
    }
    repository.create(newCat)
    return res.json("Ok")
  };
  
  const getCategoryById = (req, res) => {
    const id = req.params.id
    if (!id) return res.json({ ok: false, error: "Id required" })
    const data = repository.get()
    return res.json(data.find(x => x.id === id))
  };
  
  const updateCategory = (req, res) => {
    const id = req.params.id
    if (!id) return res.json({ ok: false, error: "Id required" })
    const body = req.body
    if (!body.id) return res.json({ ok: false, error: "Id Required" })
    if (!body.name) return res.json({ ok: false, error: "Name Required" })
    const newRecipe= {
        id: body.id,
        name: body.name
      }
    repository.delete(id)
    repository.create(newRecipe)
    return res.json("Updated")
  };
  
  const deleteCategory = (req, res) => {
    const id = req.params.id
    if (!id) return res.json({ ok: false, error: "Id required" })
    repository.delete(id)
    res.json(`Deleted ${req.params.id}`);
  };
  
  module.exports = {
    getAllCategories,
    getCategoryById,
    updateCategory,
    createCategory,
    deleteCategory,
  };

let recipes = []

const RecpieRepository = {
  get: () => {
    return recipes
  },
  create: (recipe) => {
    recipes.push(recipe)
  },
  delete: (id) => {
    if (recipes) {
      const index = recipes.findIndex(x => x.id === id)
      if (index !== -1) {
        const array = recipes.filter(x => x.id !== id)
        recipes = array
      }
    }
  }
}

module.exports = RecpieRepository



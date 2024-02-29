let categories = []

const CategoryRepository = {
  get: () => {
    return categories
  },
  create: (category) => {
    categories.push(category)
  },
  delete: (id) => {
    if (categories) {
      const index = categories.findIndex(x => x.id === id)
      if (index !== -1) {
        const array = categories.filter(x => x.id !== id)
        categories = array
      }
    }
  }
}

module.exports = CategoryRepository



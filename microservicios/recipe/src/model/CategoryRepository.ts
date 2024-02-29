import { ICategory } from "@/types/ICategory"

let categories: ICategory[] = []

export const CategoryRepository = {
  get: () => {
    return categories
  },
  create: (recipe: ICategory) => {
    categories.push(recipe)
  },
  delete: (id: string) => {
    if (categories) {
      const index = categories.findIndex(x => x.id === id)
      if (index !== -1) {
        const array = categories.filter(x => x.id !== id)
        categories = array
      }
    }
  }
}




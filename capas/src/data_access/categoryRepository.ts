
export interface ICategory {
  id: string,
  name: string,
}

export interface ICategoryRepository {
  get: () => ICategory[],
  create: (category: ICategory) => void
  delete: (id: string) => void
}

export const CategoryRepository: ICategoryRepository = {
  get: () => {
    const data = localStorage.getItem("categories")
    const result: ICategory[] = data ? JSON.parse(data) : []
    return result

  },
  create: (recipe: ICategory) => {
    const data = localStorage.getItem("categories")
    const result = data ? JSON.parse(data) : null
    const recipes: ICategory[] = result ? [...result, recipe] : [recipe]
    localStorage.setItem("categories", JSON.stringify(recipes))
  },
  delete: (id: string) => {
    const recipes = localStorage.getItem("categories")
    if (recipes) {
      const json: ICategory[] = JSON.parse(recipes)
      const index = json.findIndex(x => x.id === id)
      if (index !== -1) {
        const array = json.filter(x => x.id !== id)
        localStorage.setItem("categories", JSON.stringify(array))
      }
    }
  }
}

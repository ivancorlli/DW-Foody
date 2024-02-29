
export interface IRecipe {
  id: string,
  title: string,
  category: string,
  description: string
}

export interface IRecipeRepository {
  get: () => IRecipe[],
  create: (recipe: IRecipe) => void
  delete: (id: string) => void
}

export const RecpieRepository: IRecipeRepository = {
  get: () => {
    const data = localStorage.getItem("recipes")
    if (data) {
      const result: IRecipe[] = JSON.parse(data)
      return result
    }
    return []

  },
  create: (recipe: IRecipe) => {
    const data = localStorage.getItem("recipes")
    const result: IRecipe[] = data ? JSON.parse(data) : null
    let recipes: IRecipe[] = result ? [...result, recipe] : [recipe]
    localStorage.setItem("recipes", JSON.stringify(recipes))
  },
  delete: (id: string) => {
    const recipes = localStorage.getItem("recipes")
    if (recipes) {
      const json: IRecipe[] = JSON.parse(recipes)
      const index = json.findIndex(x => x.id === id)
      if (index !== -1) {
        const array = json.filter(x => x.id !== id)
        localStorage.setItem("recipes", JSON.stringify(array))
      }
    }

  }
}

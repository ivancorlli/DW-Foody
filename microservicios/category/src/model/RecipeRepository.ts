import { IRecipe } from "@/types/IRecipe"

let recipes: IRecipe[] = []

export const RecpieRepository = {
  get: () => {
    return recipes
  },
  create: (recipe: IRecipe) => {
    recipes.push(recipe)
  },
  delete: (id: string) => {
    if (recipes) {
      const index = recipes.findIndex(x => x.id === id)
      if (index !== -1) {
        const array = recipes.filter(x => x.id !== id)
        localStorage.setItem("recipes", JSON.stringify(array))
      }
    }
  }
}



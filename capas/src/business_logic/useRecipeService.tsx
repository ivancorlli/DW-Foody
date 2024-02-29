import { IRecipe, RecpieRepository } from "@/data_access/recipeRepository";

export default function useRecipeService() {
  const repository = RecpieRepository

  function getRecipeById(id: string): IRecipe | null {
    const recipes = repository.get()
    const recipe = recipes.find(x => x.id === id)
    return recipe ?? null
  }
  function updateRecipeById(id: string, recipe: IRecipe) {
    repository.delete(id)
    repository.create(recipe)
  }

  return {
    getRecipeById,
    updateRecipeById,
    getRecipes: repository.get,
    deleteRecipe: repository.delete,
    createRecipe: repository.create
  }
}

import { CategoryRepository, ICategory } from "@/data_access/categoryRepository"

export default function useCategoryRepository() {
  const repository = CategoryRepository

  function getCategoryById(id: string): ICategory | null {
    const recipes = repository.get()
    const recipe = recipes.find(x => x.id === id)
    return recipe ?? null
  }
  function updateCategoryById(id: string, category: ICategory) {
    repository.delete(id)
    repository.create(category)
  }

  return {
    getCategoryById,
    updateCategoryById,
    getCategories: repository.get,
    deleteCategory: repository.delete,
    createCategory: (category: ICategory) => repository.create(category)
  }
}

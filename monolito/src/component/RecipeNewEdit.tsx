import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const RecipeNewEdit = (
  props: {
    isOpen: boolean,
    onClose: () => void,
    recipeId?: string,
    recipes: { id: string, title: string, category: string, description: string }[],
    onSave: () => void
  }
) => {
  const [form, setForm] = useState<{ title: string, category: string, description: string }>({ title: '', category: '-1', description: '' })
  const [categories, setCategories] = useState<{ name: string, id: string }[]>()
  useEffect(() => {
    const data = localStorage.getItem("categories")
    if (data) {
      const result: { name: string, id: string }[] = JSON.parse(data)
      if (result.length > 0) {
        setCategories(result)
      }
    }
  }, [])

  useEffect(() => {
    async function getRecipe(recipeid: string) {
      const recipe = props.recipes.find(x => x.id === recipeid)
      if (recipe) {
        setForm({
          title: recipe.title,
          category: recipe.category,
          description: recipe.description
        })
      }
    }
    if (props.recipeId) {
      getRecipe(props.recipeId)
    }
  }, [props.recipeId])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      title: form.title,
      category: form.category,
      description: form.description,
      id: props.recipeId ? props.recipeId : btoa(JSON.stringify(Math.random() * 789))

    }
    if (props.recipeId) {
      updateRecipe(props.recipeId, data)
    } else {
      createRecipe(data)
    }
    setForm({ title: '', category: '', description: '' })
    props.onClose()
    props.onSave()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  function handleText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleClose() {
    setForm({ title: '', category: '-1', description: '' })
    props.onClose()
  }

  async function createRecipe(data: any): Promise<void> {
    const newRecipes = props.recipes.length > 0 ? props.recipes : []
    newRecipes.push(data)
    localStorage.setItem("recipes", JSON.stringify(newRecipes))

  }

  async function updateRecipe(recipeId: string, data: any) {
    const index = props.recipes.findIndex(x => x.id === recipeId)
    if (index !== -1) {
      props.recipes[index].title = data.title
      props.recipes[index].description = data.description
      props.recipes[index].category = data.category
    }
    localStorage.setItem("recipes", JSON.stringify(props.recipes))

  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {props.recipeId ?
            "Editar Receta"
            :
            "Nueva Receta"
          }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            id='new-recipe'
            onSubmit={(e) => handleSubmit(e)}
          >
            <VStack>
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input
                  name="title"
                  type='text'
                  value={form.title}
                  placeholder='Nombre de receta'
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select placeholder='Categoria' name='category' value={form.category} onChange={handleSelect}>
                  {
                    categories && categories.map((e, idx) => {
                      return <option key={idx} value={e.id} >{e.name}</option>
                    })
                  }
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Descripcion</FormLabel>
                <Textarea name='description' placeholder='Descripcion' value={form.description} onChange={handleText} />
              </FormControl>

            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            form='new-recipe'
            type='submit'
            py='5px'
            colorScheme='green'>
            {props.recipeId ?
              "Editar"
              :
              "Crear"
            }
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}


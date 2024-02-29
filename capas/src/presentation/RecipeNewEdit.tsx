import useCategoryRepository from '@/business_logic/useCategoryService'
import useRecipeService from '@/business_logic/useRecipeService'
import { IRecipe } from '@/data_access/recipeRepository'
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
  const { getRecipeById, createRecipe, updateRecipeById } = useRecipeService()
  const { getCategories } = useCategoryRepository()
  const [categories, setCategories] = useState<{ name: string, id: string }[]>()
  useEffect(() => {
    setCategories(getCategories())
  }, [])

  useEffect(() => {
    if (props.recipeId) {
      getRecipeById(props.recipeId)
    }
  }, [props.recipeId])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data: IRecipe = {
      title: form.title,
      category: form.category,
      description: form.description,
      id: props.recipeId ? props.recipeId : btoa(JSON.stringify(Math.random() * 789))

    }
    if (props.recipeId) {
      updateRecipeById(props.recipeId, data)
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


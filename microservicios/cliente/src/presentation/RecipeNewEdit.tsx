import { IRecipe } from '@/types/IRecipe'
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
    async function getCategories() {
      const data = await fetch("http:localhost:3002/api/categories")
      const json = await data.json()
      if (json) {
        setCategories(json)
      }
    }
    getCategories()
  }, [form])

  useEffect(() => {
    async function getRecipeById() {
      const data = await fetch(`http:localhost:3002/api/recipes/${props.recipeId}`)
      const json = await data.json()
      if (json) {
        setForm({
          title: json.title,
          category: json.category,
          description: json.description
        })
      }
    }
    if (props.recipeId) {
      getRecipeById()
    }
  }, [props.recipeId])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data: IRecipe = {
      title: form.title,
      category: form.category,
      description: form.description,
      id: props.recipeId ? props.recipeId : btoa(JSON.stringify(Math.random() * 789))

    }
    if (props.recipeId) {
      await fetch(`http:localhost:3002/api/recipes/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          category: data.category,
          description: data.description
        })
      })
    } else {
      await fetch('http:localhost:3002/api/recipes', {
        method: "POST",
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          category: data.category,
          description: data.description
        })
      })
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


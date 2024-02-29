import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const CategoryNewEdit = (
  props: {
    isOpen: boolean,
    onClose: () => void,
    categoryId?: string,
    categories: { id: string, name: string }[]
    onSave: () => void
  }
) => {
  const [form, setForm] = useState<{ name: string }>({ name: '' })

  useEffect(() => {
    async function getCategory(categoryId: string) {
      const category = props.categories.find(x => x.id === categoryId)
      if (category) {
        setForm({
          name: category.name
        })
      }
    }
    if (props.categoryId && props.categoryId !== "") {
      getCategory(props.categoryId)
    }
  }, [props.categoryId, props.categories])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      name: form.name,
      id: props.categoryId ? props.categoryId : btoa(JSON.stringify(Math.random() * 789))
    }
    if (props.categoryId) {
      updateCategory(props.categoryId, data)
    } else {
      createCategory(data)
    }
    setForm({ name: '' })
    props.onClose()
    props.onSave()
  }

  function handleClose() {
    setForm({ name: '' })
    props.onClose()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      name: e.target.value
    })
  }

  async function createCategory(data: any): Promise<void> {
    const newCategories = props.categories.length > 0 ? props.categories : []
    newCategories.push(data)
    localStorage.setItem("categories", JSON.stringify(newCategories))
  }

  async function updateCategory(categoryId: string, data: any) {
    const index = props.categories.findIndex(x => x.id === categoryId)
    if (index !== -1) {
      props.categories[index].name = data.name
    }
    localStorage.setItem("categories", JSON.stringify(props.categories))
  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {props.categoryId ?
            "Editar Categoria"
            :
            "Nueva Categoria"
          }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
          >
            <form
              id='new-category'
              onSubmit={(e) => handleSubmit(e)}
            >
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                type='text'
                defaultValue={form.name}
                onChange={(e) => handleChange(e)}
              />
            </form>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            form='new-category'
            type='submit'
            py='5px'
            colorScheme='green'>
            {props.categoryId ?
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

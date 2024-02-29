import React, { useEffect, useState } from 'react'
import { HStack, VStack, Button, Heading, useDisclosure, Stack, Skeleton, isChakraTheme, Divider } from '@chakra-ui/react'
import { CategoryNewEdit } from './CategoryNewEdit'
import { Category } from './Category'

interface ICategory {
  id: string,
  name: string
}

export const Categories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selected, setSelected] = useState<string>();
  useEffect(() => {
    const data = localStorage.getItem("categories")
    if (data) {
      const result: { name: string, id: string }[] = JSON.parse(data)
      if (result.length > 0) {
        setCategories(result)
      }
    }
  }, [])


  function handleSelect(categoryId: string) {
    setSelected(categoryId)
    onOpen()
  }

  function handleNew() {
    setSelected("")
    onOpen()
  }
  function handleClose() {
    setSelected("")
    onClose()
  }
  function onSave() {
    const data = localStorage.getItem("categories")
    if (data) {
      const result: { name: string, id: string }[] = JSON.parse(data)
      if (result.length > 0) {
        setCategories(result)
      }
    }
  }

  return (
    <VStack
      w="50%"
      h="100%"
      spacing={5}
    >
      <HStack
        align="center"
        spacing={5}
        justifyContent='space-between'
        w='100%'
      >
        <Heading as='h6' size='md' >Listado de categorias</Heading>
        <Button
          py='5px'
          onClick={handleNew}
          colorScheme='blue'>
          Nueva
        </Button>
      </HStack>
      <Divider />
      <CategoryNewEdit
        onSave={onSave}
        isOpen={isOpen}
        onClose={handleClose}
        categoryId={selected !== "" ? selected : undefined}
        categories={categories}
      />
      {
        categories.length > 0 ?
          categories.map((e, idx) => {
            return <Category
              key={idx}
              categoryId={e.id}
              name={e.name}
              idx={idx + 1}
              select={handleSelect}
            />
          })
          :
          <>
            <Stack h="100%" w="100%">
              <Skeleton height='40px' />
              <Skeleton height='40px' />
              <Skeleton height='40px' />
            </Stack>
          </>
      }
    </VStack>
  )
}


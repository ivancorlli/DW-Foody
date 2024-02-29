import React, { useEffect, useState } from 'react'
import { HStack, VStack, Button, Heading, useDisclosure, Stack, Skeleton, Divider } from '@chakra-ui/react'
import { Recipe } from './Recipe'
import { RecipeNewEdit } from './RecipeNewEdit'

interface IRecipe {
  id: string,
  title: string
  category: string,
  description: string
}

export const Recipes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [selected, setSelected] = useState<string>();
  useEffect(() => {
    const data = localStorage.getItem("recipes")
    if (data) {
      const result: IRecipe[] = JSON.parse(data)
      if (result.length > 0) {
        setRecipes(result)
      }
    }
  }, [])

  function handleSelect(recipeId: string) {
    setSelected(recipeId)
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
    const data = localStorage.getItem("recipes")
    if (data) {
      const result: IRecipe[] = JSON.parse(data)
      if (result.length > 0) {
        setRecipes(result)
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
        <Heading as='h6' size='md' >Listado de recetas</Heading>
        <Button
          py='5px'
          onClick={handleNew}
          colorScheme='blue'>
          Nueva
        </Button>
      </HStack>
      <Divider />
      <RecipeNewEdit
        onSave={onSave}
        isOpen={isOpen}
        onClose={handleClose}
        recipeId={selected !== "" ? selected : undefined}
        recipes={recipes}
      />
      {
        recipes.length > 0 ?
          recipes.map((e, idx) => {
            return <Recipe
              onUpdate={onSave}
              key={idx}
              RecipeId={e.id}
              title={e.title}
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


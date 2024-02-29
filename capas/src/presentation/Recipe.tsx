import useRecipeService from '@/business_logic/useRecipeService'
import { Button, HStack, Heading } from '@chakra-ui/react'
import React from 'react'

export const Recipe = (props: {
  RecipeId: string,
  title: string,
  idx: number
  select: (recipeId: string) => void
  onUpdate: () => void
}) => {
  const { deleteRecipe } = useRecipeService()
  function handleClick() {
    props.select(props.RecipeId)
  }
  async function handleDelete() {
    deleteRecipe(props.RecipeId)
    props.onUpdate()
  }

  return (
    <HStack
      w='100%'
      justifyContent='space-between'
      _hover={{
        bg: 'grey',
        cursor: 'pointer'
      }}
      p='5px'
      borderRadius={8}
    >
      <Heading as='h6' size='md' w="100%" onClick={() => handleClick()} fontWeight='bold' >{`${props.idx}. ${props.title}`}</Heading>
      <Button
        py='5px'
        onClick={() => handleDelete()}
        colorScheme='red'>
        Eliminar
      </Button>

    </HStack>
  )
}


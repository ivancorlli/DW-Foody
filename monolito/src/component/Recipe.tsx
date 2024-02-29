import { Button, HStack, Heading } from '@chakra-ui/react'
import React from 'react'

export const Recipe = (props: {
  RecipeId: string,
  title: string,
  idx: number
  select: (recipeId: string) => void
  onUpdate: () => void
}) => {

  function handleClick() {
    props.select(props.RecipeId)
  }
  async function handleDelete() {
    const recipes = localStorage.getItem("recipes")
    if (recipes) {
      const json: { id: string, name: string }[] = JSON.parse(recipes)
      const index = json.findIndex(x => x.id === props.RecipeId)
      if (index !== -1) {
        const array = json.filter(x => x.id !== props.RecipeId)
        localStorage.setItem("recipes", JSON.stringify(array))
      }
    }
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


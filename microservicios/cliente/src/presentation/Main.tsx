'use client'
import { Box, Center, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { Recipes } from './Recipes'
import { Categories } from './Categories'

export const Main = (props: {}) => {
  return (
    <Stack p='5px' h='100vh' color='dark'>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          <Tab>Recetas</Tab>
          <Tab>Categorias</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justifyContent='center' align='center'>
              <Recipes />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent='center' align='center'>
              <Categories />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>)
}

import Head from 'next/head';
import React from 'react';
import QueryBoxComponent from '../components/QueryBoxComponent';
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <ChakraProvider>
      <QueryBoxComponent></QueryBoxComponent>
      < ToastContainer />
    </ChakraProvider>
  )
  
}

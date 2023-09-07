import { Box, chakra, Flex } from "@chakra-ui/react";

export const Container = chakra(Flex, {
  baseStyle: {
      positon: 'relative',
      width: '100%',
      height: '80vh',
      pb: '10%',
      flexDirection: 'column',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      
    },
}) 

export const SubContainer = chakra(Flex, {
  baseStyle: {
      width: '40%',
      minheight: '60%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      bg: 'white',
      borderRadius: '2xl',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
      padding: '1% 4% 4% 4%',
      marginTop: "20%"
    },


});
    

import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { FormComponent } from './Form';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="20vh" p={3}>
          <FormComponent/>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

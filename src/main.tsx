import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider, ContentProvider, ProjectsProvider, TasksProvider } from './contexts/index.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContentProvider>
        <ProjectsProvider>
          <TasksProvider>
            <ChakraProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ChakraProvider>
          </TasksProvider>
        </ProjectsProvider>
      </ContentProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App.tsx'
import { theme } from './theme.ts';
import { AuthProvider } from './AuthContext.tsx';
import { FavoritesProvider } from './Favorites.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </AuthProvider>
      </ThemeProvider>
  </React.StrictMode>
);


import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { AuthProvider } from './state/authContext';
import { RecipesProvider } from './state/recipesContext';
import { getStoredTheme, applyTheme } from './utils/theme';

// PUBLIC_INTERFACE
function App() {
  // initialize theme on first render
  useEffect(() => {
    const theme = getStoredTheme();
    applyTheme(theme);
  }, []);

  return (
    <div className="App app-surface">
      <AuthProvider>
        <RecipesProvider>
          <BrowserRouter>
            <Header />
            <main className="app-main" role="main">
              <AppRoutes />
            </main>
            <Footer />
          </BrowserRouter>
        </RecipesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

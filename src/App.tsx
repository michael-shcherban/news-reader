import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Article } from './pages/Article';
import { Signup } from './pages/Signup';
import { useAuth } from './AuthContext';
import { Dashboard } from './pages/Dashboard';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {!!user ? (
          <Route path="/" element={<Main />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/article" element={<Article />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        ) : <Route path="/dashboard" element={<Navigate to="/login" replace={true} />} />}

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
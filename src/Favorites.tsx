import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

type Favorite = {
  id: number;
  votes: number;
};

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (favoriteId: number) => Promise<void>;
  removeFavorite: (favoriteId: number) => Promise<void>;
  voteForFavorite: (favoriteId: number, votes: number) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

type FavoritesProviderProps = {
  children: ReactNode;
};

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setFavorites(doc.data().favorites || []);
        } else {
          setFavorites([]);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const addFavorite = async (favoriteId: number) => {
    if (user) {
      const updatedFavorites = [...favorites, { id: favoriteId, votes: 0 }];

      await setDoc(doc(db, 'users', user.uid), { favorites: updatedFavorites });
    }
  };

  const removeFavorite = async (favoriteId: number) => {
    if (user) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== favoriteId);

      await setDoc(doc(db, 'users', user.uid), { favorites: updatedFavorites });
    }
  };

  const voteForFavorite = async (favoriteId: number, votes: number) => {
    if (user) {
      const updatedFavorites = favorites.map((fav) =>
        fav.id === favoriteId ? { ...fav, votes } : fav
      );
      await setDoc(doc(db, 'users', user.uid), { favorites: updatedFavorites });
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, voteForFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export { FavoritesProvider, useFavorites };
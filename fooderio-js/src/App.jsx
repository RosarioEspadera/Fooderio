// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

import NavBar from './components/NavBar';
import Catalog from './components/Catalog';
import DishForm from './components/DishForm';
import Profile from './components/Profile';
import LoginPage from './components/LoginPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(true);

  // Auth listener
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch dishes method
  async function fetchDishes() {
    setLoadingDishes(true);
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setDishes(data);
    setLoadingDishes(false);
  }

  // Initial load
  useEffect(() => {
    fetchDishes();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <BrowserRouter>
      <NavBar user={user} onSignOut={handleSignOut} />

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <Catalog
                user={user}
                dishes={dishes}
                loading={loadingDishes}
                onRefresh={fetchDishes}
              />
            }
          />

          <Route
            path="/publish"
            element={
              user ? (
                <DishForm
                  onPublish={() => {
                    fetchDishes();
                  }}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              user ? <Profile user={user} /> : <Navigate to="/login" replace />
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

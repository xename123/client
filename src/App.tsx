import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBlock from './components/NavigationBlock/NavigationBlock';
import CocktailDetails from './components/RecipeDisplay/RecipeDisplay';
import NewCocktailForm from './components/NewCocktailForm/NewCocktailForm';
import RegistrationForm from './components/Form/Form';

import './styles/style.scss'
import axios from 'axios';
import { NODE_URL } from './api/config';
import { getJWT } from './api/api-utils';
import Login from './components/Form/LoginForm';


const App: React.FC = () => {

  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    const token = getJWT()
    const checkAuth = async () => {
      if (token) {

        try {
          const response = await axios.get(`${NODE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error('Error checking authentication:', error);
        }
      }
    };
    checkAuth();
  }, []);


  return (
    <Router>
      <div className='montserrat container'>
        <Routes>
          {user ? <>
            <Route path="/" element={<NavigationBlock user={user} />} />
            <Route path="/cocktail/:id" element={<CocktailDetails />} />
            <Route path="/add" element={<NewCocktailForm />} />
          </> : <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegistrationForm setUser={setUser} />} />
          </>
          }

        </Routes>
      </div>
    </Router>

  );
};

export default App;

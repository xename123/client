import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
import SearchBar from '../SearchBar/SearchBar';


import s from './Navigation.module.scss'
import { getData, isResponseOk, removeJWT } from '../../api/api-utils';
import { BASE_URL } from '../../api/config';


register();

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    }
  }
}

interface NavigationProps {
  user: any;
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const [cocktails, setCocktails] = useState<any[]>([]);

  const [openResult, setOpenResult] = useState<Boolean>(false)

  const handleLogout = () => {
    removeJWT()
    window.location.reload()
  }
  useEffect(() => {
    const fetchCocktails = async () => {
      const response = await getData(`${BASE_URL}/search.php?f=a`)
      return isResponseOk(response) ? setCocktails(response.data.drinks) : response;
    };
    fetchCocktails();
  }, []);

  return (
    <div className={s.navigation}>
      <div className={s.navigation__top}>
        <h2>Popular Cocktails</h2>
        <SearchBar openResult={openResult} setOpenResult={setOpenResult} />
        {!user && <Link className={s.button} to="/register">
          Register
        </Link>}
        {!user && <Link className={s.button} to="/login">
          Log in
        </Link>}


        {user && <button onClick={handleLogout} className={s.button}>
          Log out
        </button>}
        {user ? <p>username: {user.username}</p> : <></>}

      </div>
      <swiper-container space-between="30" slides-per-view="3">
        {cocktails.map(cocktail => (
          <swiper-slide key={cocktail.idDrink}>
            <Link className={s.navigation__item} to={`/cocktail/${cocktail.idDrink}`}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            </Link>
          </swiper-slide>
        ))}
      </swiper-container>

      <Link to={`/add`}>
        Add new Drink
      </Link>
    </div>
  );
};

export default Navigation;
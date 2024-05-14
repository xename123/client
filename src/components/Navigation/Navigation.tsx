import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
import SearchBar from '../SearchBar/SearchBar';


import s from './Navigation.module.scss'
import { getData, isResponseOk, removeJWT } from '../../api/api-utils';
import { BASE_URL, NODE_URL } from '../../api/config';


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
      const drinksFromDataBase = await getData(`${NODE_URL}/drinks`)
      const resArray = response.data.drinks ? response.data.drinks.concat(drinksFromDataBase.data) : drinksFromDataBase.data
      return isResponseOk(response) ? setCocktails(resArray || []) : response;
    };
    fetchCocktails();
  }, []);

  return (
    <div className={s.navigation}>
      <div className={s.navigation__top}>
        <h2>Popular Cocktails</h2>
        <SearchBar openResult={openResult} setOpenResult={setOpenResult} />
        <div>
          <button onClick={handleLogout} className={s.button}>
            Log out
          </button>

          <p>{window.innerWidth > 500 ? "username:" : ''} {user.username}</p>
        </div>

      </div>
      <swiper-container space-between="30" slides-per-view={window.innerWidth > 700 ? "3" : window.innerWidth > 450 ? "2" : "1"}>
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
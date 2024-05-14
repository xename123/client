import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData, isResponseOk } from '../../api/api-utils';
import { BASE_URL, NODE_URL } from '../../api/config';

import s from './RecipeDisplay.module.scss'

interface Cocktail {
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
}

const CocktailDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      const response = await getData(`${BASE_URL}/lookup.php?i=${id}`)
      const getDrinkFromDataBase = await getData(`${NODE_URL}/drinks/${id}`)
      const drink = response.data.drinks ? response.data.drinks[0] : getDrinkFromDataBase.data
      return isResponseOk(response) ? setCocktail(drink) : response;
    };

    fetchCocktail();
  }, [id]);



  return (
    <>
      {
        cocktail ? (
          <div className={s.display}>
            < h2 > {cocktail.strDrink}</h2 >
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strInstructions}</p>
            <h3>Ingredients:</h3>
            <ul className={s.list}>
              {cocktail.strIngredient1 && <li>{cocktail.strIngredient1}</li>}
              {cocktail.strIngredient2 && <li>{cocktail.strIngredient2}</li>}
            </ul>
          </div >
        )
          : (<div>Loading...</div>)
      }
    </>
  )
}

export default CocktailDetails;
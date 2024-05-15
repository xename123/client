import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData, isResponseOk } from '../../api/api-utils';
import { BASE_URL, NODE_URL } from '../../api/config';

import s from './RecipeDisplay.module.scss'

interface Cocktail {
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient: string[];
}

const CocktailDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      const response = await getData(`${BASE_URL}/lookup.php?i=${id}`)
      const getDrinkFromDataBase = await getData(`${NODE_URL}/drinks/${id}`)
      if (response.status === 200 && response.data.drinks !== null) {
        const cocktail = response.data.drinks[0]
        cocktail.strIngredient = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3, cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6, cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9, cocktail.strIngredient10, cocktail.strIngredient11, cocktail.strIngredient12, cocktail.strIngredient13, cocktail.strIngredient14, cocktail.strIngredient15]
        return isResponseOk(response) ? setCocktail(cocktail) : response;
      } else {
        return isResponseOk(getDrinkFromDataBase) ? setCocktail(getDrinkFromDataBase.data) : response;

      }
    }

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
              {cocktail.strIngredient.map((ingredient) => {
                if (ingredient === null) return
                return <li>{ingredient.trim()}</li>
              })}
            </ul>
          </div >
        )
          : (<div>Loading...</div>)
      }
    </>
  )
}

export default CocktailDetails;
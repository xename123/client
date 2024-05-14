import React from 'react';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  // Add other properties as needed
}

interface CocktailListProps {
  cocktails: Cocktail[];
}

const CocktailList: React.FC<CocktailListProps> = ({ cocktails }) => {
  return (
    <div className="cocktail-list">
      {cocktails.map(cocktail => (
        <div key={cocktail.idDrink}>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        </div>
      ))}
    </div>
  );
};

export default CocktailList;

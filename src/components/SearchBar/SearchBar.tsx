import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import s from './SearchBar.module.scss'
import { BASE_URL, NODE_URL } from '../../api/config';
import { getData, isResponseOk } from '../../api/api-utils';

interface SearchBar {
  openResult: Boolean;
  setOpenResult: Function;
}


const SearchBar: React.FC<SearchBar> = ({ openResult, setOpenResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    const response = await getData(`${BASE_URL}/search.php?s=${searchTerm}`)
    const drinksFromDataBase = await getData(`${NODE_URL}/drinks?name=${searchTerm}`)
    const resArray = response.data.drinks ? response.data.drinks.concat(drinksFromDataBase.data) : drinksFromDataBase.data
    return isResponseOk(response) ? setSearchResults(resArray || []) : setSearchResults([]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setOpenResult(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={s.bar} ref={searchBarRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search cocktails..."
      />
      <button
        className={s.button}
        onClick={() => {
          setOpenResult(true);
          handleSearch();
        }}
      >
        Search
      </button>
      <div className={`${s.results} ${openResult ? s['show'] : s['hidden']}`}>
        {searchResults.length > 0 ? searchResults.map((cocktail) => (
          <Link className={s.result} key={cocktail.idDrink} to={`/cocktail/${cocktail.idDrink}`}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strDrink}</p>
          </Link>
        )) : <p>Can't find a cocktail</p>}
        { }
      </div>
    </div>
  );
};

export default SearchBar;

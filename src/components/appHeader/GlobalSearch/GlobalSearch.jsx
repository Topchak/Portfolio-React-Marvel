import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMarvelServices from "../../../services/MarvelService";
import SpinnerSmall from "../../widgets/spiner/SpinnerSmall";

import "./GlobalSearch.scss";

const GlobalSearch = () => {
  const { getCharacterByName2, setProcess, process } = useMarvelServices();
  const [inputValue, setInputValue] = useState("");
  const [heroesList, setHeroesList] = useState([]);

  const onChange = async (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.length === 0) {
      setHeroesList([]);
      return;
    } else {
      setProcess("loading");
      const characters = await getCharacterByName2(newValue);

      setHeroesList(characters);
      setProcess("waiting");
    }
  };

  const clearInput = () => {
    setInputValue("");
    setHeroesList([]);
  };

  console.log(heroesList);

  return (
    <div className="app__global-search">
      <div className="app__global-search-input-wrapper">
        <input
          type="text"
          placeholder="Global hero search..."
          onChange={onChange}
          value={inputValue}
        />
        {process === "loading" ? <SpinnerSmall /> : null}
        {inputValue && (
          <div className="clear" onClick={clearInput}>
            ✘
          </div>
        )}
      </div>
      <ul className="app__global-search-list">
        {heroesList.map((hero) => (
          <Link
            key={hero.id}
            className="app__global-search-item"
            to={`/characters/${hero.id}`}
            onClick={clearInput}
          >
            <li>
              <img src={`${hero.thumbnail}`} alt={hero.name} /> {hero.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GlobalSearch;

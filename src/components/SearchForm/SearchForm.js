import React from 'react';
import './SearchForm.css';

const SearchForm = ({searchPhotos, query, handleChange}) => {
  return (
    <form className="search-form" onSubmit={searchPhotos}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Найти картинку в Unsplash"
        value={query}
        onChange={handleChange}
      />
      <button className="search-form__button">Найти</button>
    </form>
  );
};

export default SearchForm;

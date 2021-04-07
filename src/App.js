import React from 'react';
import './App.css';
import Images from "./components/Images/Images";
import SearchForm from "./components/SearchForm/SearchForm";

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const App = () => {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');

  const getPhotos = React.useCallback(() => {
    let apiUrl = `https://api.unsplash.com/photos?&lang=ru`;
    if (query) apiUrl = `https://api.unsplash.com/search/photos?&query=${query}`;
    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data;
        if (page === 1) return setImages(imagesFromApi);

        setImages((images) => [...images, ...imagesFromApi]);
      })
      .catch(console.error);
  }, [page, query]);

  React.useEffect(() => {
    getPhotos();
  }, [page, getPhotos]);

  const searchPhotos = (e) => {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

  if (!accessKey) {
    return <a
      href="https://unsplash.com/developers"
      className="error"
    >
      Необходимо добавить Unsplash API Key
    </a>
  }

  const handleSetPage = () => {
    setPage((page) => page + 1);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="app">
      <h1 className="main-title">Галерея изображений Unsplash</h1>

      <SearchForm handleChange={handleChange} query={query} searchPhotos={searchPhotos} />

      <Images images={images} handleSetPage={handleSetPage} />
    </div>
  );
}

export default App;

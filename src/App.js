import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const App = () => {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    getPhotos();
  }, [page]);

  const getPhotos = () => {
    let apiUrl = `https://api.unsplash.com/photos?`;
    if (query) apiUrl = `https://api.unsplash.com/search/photos?&lang=ru&query=${query}`;
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
  }

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

  return (
    <div className="app">
      <h1>Галерея изображений Unsplash</h1>

      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Найти картинку в Unsplash"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Найти</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}>
        <div className="image-grid">
          {images.map((image) => (
            <a className="image" key={image.id} href={image.links.html} target="_blank" rel="noopener noreferrer">
              <img src={image.urls.regular} alt={image.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;

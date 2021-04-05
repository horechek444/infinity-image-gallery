import React from 'react';
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const App = () => {
const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}`)
      .then((res) => res.json())
      .then(setImages)
      .catch((err) => console.log(err));
  }, []);

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

      <form>
        <input type="text" placeholder="Найти картинку в Unsplash"/>
        <button>Найти</button>
      </form>

      <div className="image-grid">
        {images.map((image) => (
          <div className="image" key={image.id}>
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

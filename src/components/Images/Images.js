import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import './Images.css';

const Images = ({images, handleSetPage }) => {
  return (
    <InfiniteScroll
      dataLength={images.length}
      next={handleSetPage}
      hasMore={true}
      loader={<h4>Loading...</h4>}>
      <div className="images">
        {images.map((image) => (
          <a className="images__item" key={image.id} href={image.links.html} target="_blank" rel="noopener noreferrer">
            <img src={image.urls.regular} alt={image.alt_description} />
          </a>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Images;

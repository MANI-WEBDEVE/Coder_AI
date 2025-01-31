import React from 'react';

const ImageComponent = ({ imageUrl }:{imageUrl:string}) => {
  // Check if imageUrl is valid
  const validSrc = imageUrl || null;

  return (
    <div>
      {validSrc ? (
        <img src={validSrc} alt="Description" />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ImageComponent;

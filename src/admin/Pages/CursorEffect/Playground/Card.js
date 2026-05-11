import React from 'react';

const Card = (props) => {
  const { title, description,icon } = props;
  return (
    <div className='customCursorPlaygroundCard'>
      {icon}
      <h3 className='customCursorPlaygroundCardTitle'>{title}</h3>
      <p className='customCursorPlaygroundCardDesc'>{description}</p>
    </div>
  );
};

export default Card;
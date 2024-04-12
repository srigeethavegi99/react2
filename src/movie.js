import React from "react";

const Movie = ({ title, director, year, onDelete, onEdit }) => {
  return (
    <li>
      <h2>{title}</h2>
      <p>Directed by: {director}</p>
      <p>Released in: {year}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
    </li>
  );
};

export default Movie;

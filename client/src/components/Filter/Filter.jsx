import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, filterByGenre, filterByOrigin, orderByName } from "../../actions/index";
import { useEffect, useState } from "react";

export default function Filter({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  function handleFilterByGenre(e) {
    dispatch(filterByGenre(e.target.value));
  }

  function handleFilterByOrigin(e) {
    dispatch(filterByOrigin(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`)
  }

  return (
    <div>
      <select onChange={(e) => handleSort(e)}>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
      <select onChange={(e) => handleFilterByGenre(e)}>
        <option value="all genres">All</option>
        {genres &&
          genres.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name}
            </option>
          ))}
      </select>
      <select onChange={(e) => handleFilterByOrigin(e)}>
        <option value="all games">All</option>
        <option value="created">Created</option>
        <option value="api">Existing</option>
      </select>
      <select>
        <option value="higher rank">Higher Rank</option>
        <option value="Lower rank">Lower Rank</option>
      </select>
    </div>
  );
}

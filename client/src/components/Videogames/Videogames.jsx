import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions/index";
import { Link } from "react-router-dom";
import GameCard from "../Card/Card";
import Filter from "../Filter/Filter";
import "./Videogames.css";
import Paging from "../Pagination/Pagination";

export default function Videogames() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
  const [ order, setOrder ] = useState('');

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="container">
      <Link to="/videogame">Create Videogame</Link>
      <h1>I love videogames ♥</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all videogames
      </button>
      <div>
        <Filter 
        setCurrentPage={setCurrentPage} 
        setOrder={setOrder}
        />
        <Paging
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paging={paging}
        />
        {currentVideogames &&
          currentVideogames.map((v) => {
            return (
              <Fragment key={v.id}>
                <Link to={`/videogame/${v.id}`}>
                  <GameCard
                    name={v.name}
                    background_image={v.background_image}
                    rating={v.rating}
                    genres={v.genres}
                  />
                </Link>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

import React from "react";

export default function GameCard({name, background_image, rating, genres}) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={background_image} alt="not found" width="250px" height="200px"/>
            <h5>{rating}</h5>
            <h5>{genres.join(", ")}</h5>
        </div>
    )
}
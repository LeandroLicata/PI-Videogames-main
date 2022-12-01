import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
} from "../actions/action-types";

const initialState = {
  videogames: [],
  genres: [],
  allVideogames: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_BY_GENRE:
      const allVideogames = state.allVideogames;
      const videogamesFilteredByGenre =
        action.payload === "all genres"
          ? allVideogames
          : allVideogames.filter(
              (v) =>
                v.genres.find((g) => g === action.payload) === action.payload
            );
      return {
        ...state,
        videogames: videogamesFilteredByGenre,
      };
    case FILTER_BY_ORIGIN:
      const allVideogames2 = state.allVideogames;
      const videogamesFilteredByOrigin =
        action.payload === "created"
          ? allVideogames2.filter((v) => v.createdInDb)
          : allVideogames2.filter((v) => !v.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "all games"
            ? allVideogames2
            : videogamesFilteredByOrigin,
      };
    case ORDER_BY_NAME:
      let sortedArray =
        action.payload === "a-z"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
            return {
              ...state,
              videogames: sortedArray
            }
    default:
      return state;
  }
}

import axios from 'axios';
import {
    GET_VIDEOGAMES,
    GET_GENRES,
    FILTER_BY_GENRE,
    FILTER_BY_ORIGIN,
    ORDER_BY_NAME,
} from './action-types';

export function getVideogames() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    }
}

export function getGenres() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

export function filterByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterByOrigin(payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
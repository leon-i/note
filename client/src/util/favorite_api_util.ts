import {NewFavorite} from "../interfaces";
import axios from "axios";

export const getFavorites = (userId : number) => (
    axios.get(`/api/users/${userId}/favorite`)
)

export const createFavorite = (data : NewFavorite) => (
    axios.post(`/api/users/${data.UserID}/favorite`, data)
)

export const deleteFavorite = (data : NewFavorite) => (
    axios.delete(`/api/users/${data.UserID}/favorite/${data.NotepadID}`)
)
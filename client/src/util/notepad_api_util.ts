import axios from 'axios';
import { NewNotepad } from '../interfaces';

export const fetchNotepads = () => (
    axios.get('/api/notepads')
)

export const fetchNotepad = (id : number) => (
    axios.get(`/api/notepads/${id}`)
)

export const createNotepad = (data : NewNotepad) => (
    axios.post('/api/notepads', data)
)

export const deleteNotepad = (id : number) => (
    axios.delete(`/api/notepads/${id}`)
)

export const searchNotepads = (query : string) => (
    axios.get(`/api/notepads/${query}`)
)
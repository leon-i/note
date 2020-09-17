import axios from 'axios';
import { NewPost } from '../interfaces';

export const fetchComments = () => (
    axios.get(`/api/comments`)
)

export const fetchComment= (id : number) => (
    axios.get(`/api/comments/${id}`)
)

export const createComment = (data : FormData) => (
    axios.post('/api/comments', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
)

export const deleteComment = (id : number) => (
    axios.delete(`/api/comments/${id}`)
)
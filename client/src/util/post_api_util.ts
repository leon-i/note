import axios from 'axios';
import { NewPost } from '../interfaces';

export const fetchPosts = () => (
    axios.get(`/api/posts`)
)

export const fetchPost = (id : number) => (
    axios.get(`/api/posts/${id}`)
)

export const createPost = (data : FormData) => (
    axios.post('/api/posts', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
)

export const deletePost = (id : number) => (
    axios.delete(`/api/posts/${id}`)
)
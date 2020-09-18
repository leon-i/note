export interface User {
    user_id: number;
    username: string;
    email: string;
    exp?: number;
} 

export interface NewUser {
    username : string;
    email : string;
    password : string;
}

export interface LoginInput {
    identity: string;
    password: string;
}

export interface Notepad {
    ID: number;
    name: string;
    description: string;
    posts: Post[];
    CreatedAt: string;
    UpdatedAt: string;
}

export interface NewNotepad {
    name: string;
    description: string;
}

export interface Post {
    ID: number;
    title: string;
    content: string;
    imageURL: string;
    author_id: number;
    author: User;
    notepad_id: number;
    notepad: Notepad;
    comments: Comment[];
}

export interface NewPost {
    title: string;
    content: string;
    user_id: number;
    notepad_id: number;
}

export interface Comment {
    ID: number;
    content: string;
    imageURL: string;
    author_id: number;
    author: User;
    post_id: number;
    replies: Comment[];
}
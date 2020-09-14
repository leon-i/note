import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../reducers/root_reducer';
import { NotepadState } from '../reducers/entities/entities_reducer';
import { fetchNotepad } from '../actions/notepad_actions';
import { Notepad, Post } from '../interfaces';
import PostItem from '../components/posts/post';
import PostForm from '../components/posts/post_form';
import LoadingPost from '../components/posts/loading_post';
import { Space, Button, Row, Col, Typography } from 'antd';

type NotepadCollection = NotepadState & { [id : string]: Notepad };

interface Props {
    notepads: NotepadCollection;
    posts: Post[];
    fetchNotepad: typeof fetchNotepad;
}

type TParams =  { id: string };

const postsConvert = (posts : Post[], loading : boolean) => (
    posts.map((post : Post, idx : number) => (
        <PostItem post={post} loading={loading} key={idx} />
    ))
)

const NotepadScreen : React.FC<Props & RouteComponentProps<TParams>> = ({ match, notepads, posts, fetchNotepad }) => {
    const [fetchingState, setFetchingState] = useState<boolean>(false);
    const [modalState, setModalState] = useState<boolean>(false);

    const headerTitle = fetchingState ? 'Loading...' : notepads[0]?.name;

    useEffect(() => {
        setFetchingState(true);
        const receiveNotepads = async() => {
            await fetchNotepad(match.params.id);
            setFetchingState(false);
        }

        receiveNotepads();
    }, [match.params.id, fetchNotepad]);

    return (
        <>
            <Space className='post-index' direction="vertical" size="large">
                <header className="notepad-header">
                    <Typography.Title level={2}>{`#${headerTitle}`}</Typography.Title>
                    <Button onClick={() => setModalState(true)}>Create Post</Button>
                </header>
                {
                    (!fetchingState && notepads[0] && posts) ?
                    postsConvert(posts, fetchingState) : 
                    <LoadingPost />
                }
            </Space>
            <PostForm notepadId={Number(match.params.id)} 
                notepadName={notepads[0] ? notepads[0].name : ''}
                visible={modalState} 
                closeModal={() => setModalState(false)} />
        </>
    )
};

const mapStateToProps = (state : RootState) => ({
    notepads: state.entities.notepads,
    posts: state.entities.posts
})

const mapDispatchToProps = ({
    fetchNotepad
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotepadScreen));
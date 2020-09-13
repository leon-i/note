import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import { NotepadState } from '../../reducers/entities/entities_reducer';
import { fetchNotepad } from '../../actions/notepad_actions';
import { Notepad, Post } from '../../interfaces';
import PostItem from '../posts/post';
import PostForm from '../posts/post_form';
import { Space, Button } from 'antd';

type NotepadCollection = NotepadState & { [id : string]: Notepad }

interface Props {
    notepads: NotepadCollection;
    fetchNotepad: typeof fetchNotepad;
}

type TParams =  { id: string };

const postsConvert = (posts : Post[], loading : boolean) => (
    posts.map((post : Post) => (
        <PostItem post={post} loading={loading} />
    ))
)

const NotepadDisplay : React.FC<Props & RouteComponentProps<TParams>> = ({ match, notepads, fetchNotepad }) => {
    const [notepadState, setNotepadState] = useState<Notepad | null>(null);
    const [fetchingState, setFetchingState] = useState<boolean>(false);
    const [modalState, setModalState] = useState<boolean>(false);

    useEffect(() => {
        setFetchingState(true);
        const receiveNotepads = async() => {
            fetch(`/api/notepads/${match.params.id}`)
                .then(res => res.json())
                .then(res => setNotepadState(res))
                .finally(() => setFetchingState(false))
        }

        receiveNotepads();
    }, []);

    return (
        <>
            <Space className='post-index' direction="vertical" size="large">
                <Button onClick={() => setModalState(true)}>Create Post</Button>
                {
                    notepadState &&
                    postsConvert(notepadState.posts, fetchingState)
                }
            </Space>
            <PostForm notepad_id={Number(match.params.id)} 
                visible={modalState} 
                closeModal={() => setModalState(false)} />
        </>
    )
};

const mapStateToProps = (state : RootState) => ({
    notepads: state.entities.notepads
})

const mapDispatchToProps = ({
    fetchNotepad
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotepadDisplay));
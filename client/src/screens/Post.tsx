import React, { useEffect, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { Post, Comment } from '../interfaces';
import { RootState } from '../reducers/root_reducer';
import { fetchPost } from '../actions/post_actions';
import {Card} from 'antd';
import styled from "styled-components";
import PostItem from "../components/posts/post";
import CommentItem from '../components/comments/comment';

const CommentForm = React.lazy(() => import('../components/comments/comment_form'));

const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 24px 32px;
    color: #fff;
    
    .ant-row {
        width: 100%;
    }

    .comments-index {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: flex-start;
        width: 100%;
        padding: 12px 0;
        margin-left: 12%;
    }
    
    .ant-card-actions > li {
        margin: 5px 0;
    }
    
    .ant-btn-text {
        color: #fff;
        
        &:hover {
            color: #1890ff;
        }
    }
`;

interface Props {
    post: Post;
    comments: Comment[];
    fetchPost: typeof fetchPost;
}

type TParams =  { postId: string };

const commentsConvert = (comments : Comment[], handleReply : (id : number) => void) => (
    comments.map((comment : Comment, idx : number) => (
        <CommentItem comment={comment} handleReply={handleReply} />
    ))
);

const PostDisplay : React.FC<Props & RouteComponentProps<TParams>> = ({ post, comments, fetchPost, match }) => {
    const [fetchingState, setFetchingState] = useState<boolean>(false);
    const [modalState, setModalState] = useState<boolean>(false);
    const [replyState, setReplyState] = useState<number | null>(null);

    useEffect(() => {
        const getPost = async() => {
            setFetchingState(true);
            await fetchPost(match.params.postId);
            setFetchingState(false);
        }

        getPost();
    }, [match.params.postId, fetchPost]);

    const handleReply = (replyId : number) => {
        setReplyState(replyId);
        setModalState(true);
    }

    return (
        <PostWrapper>
            {
                !post ? (
                    <Card title='...' loading={fetchingState} />
                ) : (
                    <>
                    <PostItem post={post} loading={false}
                              withPreview={false}
                              newComment={() => setModalState(true)} />
                    <div className='comments-index'>
                        {
                            !fetchingState &&
                            commentsConvert(comments, handleReply)
                        }
                    </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <CommentForm postId={post.ID}
                                replyId={replyState}
                                visible={modalState}
                                closeModal={() => {
                                    setReplyState(null);
                                    setModalState(false);
                                }}/>
                        </Suspense>
                    </>
                )
            }
        </PostWrapper>
    )
}

const mapStateToProps = (state : RootState) => ({
    post: state.entities.posts[0],
    comments: state.entities.comments
});

const mapDispatchToProps = ({
    fetchPost
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDisplay));
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Post, Comment } from '../interfaces';
import { RootState } from '../reducers/root_reducer';
import { fetchPost } from '../actions/post_actions';
import { Card } from 'antd';

interface Props {
    post: Post;
    fetchPost: typeof fetchPost;
}

type TParams =  { postId: string };

const commentsConvert = (comments : Comment[]) => (
    comments.map((comment : Comment, idx : number) => (
        <Card title={comment.author.username} className='comment-item' key={idx}>
            {comment.content}
        </Card>
    ))
);

const PostDisplay : React.FC<Props & RouteComponentProps<TParams>> = ({ post, fetchPost, match }) => {
    const [fetchingState, setFetchingState] = useState(false);

    useEffect(() => {
        const getPost = async() => {
            setFetchingState(true);
            await fetchPost(match.params.postId);
            setFetchingState(false);
        }

        getPost();
    }, [match.params.postId, fetchPost]);

    return (
        <div className='post-display'>
            {
                !post ? (
                    <Card title='...' loading={fetchingState} />
                ) : (
                    <>
                    <Card title={post.title} className='post-main'>
                        {post.content}
                    </Card>
                    <div className='comments-index'>
                        {
                            post.comments?.length > 0 &&
                            commentsConvert(post.comments)
                        }
                    </div>
                    </>
                )
            }
        </div>
    )
}

const mapStateToProps = (state : RootState) => ({
    post: state.entities.posts[0]
});

const mapDispatchToProps = ({
    fetchPost
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDisplay));
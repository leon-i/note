import React from 'react';
import { Link } from 'react-router-dom';
import { Post, Comment } from '../../interfaces';
import { Row, Col, Card } from 'antd';

interface Props {
    post: Post;
    loading: boolean;
}

const commentPreview = (comments : Comment[], loading : boolean) => (
    comments.slice(0, 2).map((comment : Comment) => (
        <Row>
            <Col span={24}>
                <Card title={comment.ID} style={{ maxHeight:'150px', color: '#fff'}}>
                    {comment.content}
                </Card>
            </Col>
        </Row>
    ))
)

const PostItem : React.FC<Props> = ({ post, loading }) => (
    <Row>
        <Col span={16}>
            <Card loading={loading} title={
                !loading &&
                <Link to={`/Posts/${post.ID}`}>
                    {post.title}
                </Link>
            } style={{ color: '#fff' }}>
                {post.content}
            </Card>
        </Col>
        <Col className='comments' span={8}>
            {
                post.comments &&
                commentPreview(post.comments, loading)
            }
        </Col>
    </Row>
)

export default PostItem;
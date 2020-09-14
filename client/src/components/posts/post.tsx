import React from 'react';
import { Link } from 'react-router-dom';
import { Post, Comment } from '../../interfaces';
import { Row, Col, Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Props {
    post: Post;
    loading: boolean;
}

const commentPreview = (comments : Comment[], loading : boolean) => (
    comments.slice(0, 2).map((comment : Comment, idx : number) => (
        <Row key={idx}>
            <Col span={24}>
                <Card title={comment.author.username} 
                    style={{ maxHeight:'150px', color: '#fff'}}
                    loading={loading}>
                    {comment.content}
                </Card>
            </Col>
        </Row>
    ))
)

const PostItem : React.FC<Props> = ({ post, loading }) => (
    <Row>
        <Col span={16}>
            <Card className="post-item" loading={loading} title={
                !loading &&
                <div className='post-title'>
                    <Link to={`${post.notepad_id}/Posts/${post.ID}`}>
                        {post.title}
                    </Link>
                    <Typography.Title level={4}>
                        <UserOutlined />
                        {post.author.username}
                    </Typography.Title>
                </div>
            } style={{ color: '#fff' }}
            actions={[
                <Link to={`${post.notepad_id}/Posts/${post.ID}`}>
                    {`${post.comments ? post.comments.length : 0} Comments`}
                </Link>
            ]}>
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
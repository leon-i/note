import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../interfaces';
import { Row, Col, Typography, Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PostCard } from "./styles";
import CommentsPreview from "../comments/comments_preview";

interface Props {
    post: Post;
    loading: boolean;
    withPreview: boolean;
    newComment?: () => void;
}

const PostItem : React.FC<Props> = ({ post, loading , withPreview, newComment}) => (
    <Row justify={withPreview ? 'start' : 'center'}>
        <Col md={withPreview ? 16 : 20} sm={24} xs={24}>
            <PostCard loading={loading} title={
                !loading &&
                <div className='post-title'>
                    <Link to={withPreview ?
                        `${post.notepad_id}/Posts/${post.ID}` :
                        '#'
                    }>
                        {post.title}
                    </Link>
                    <Typography.Title level={4}>
                        <UserOutlined />
                        {post.author.username}
                    </Typography.Title>
                </div>
            }
            actions={[
                withPreview ?(
                    <Link to={`${post.notepad_id}/Posts/${post.ID}`}>
                        {`${post.comments ? post.comments.length : 0} Comments`}
                    </Link>
                ) : (
                    <Button type='text' onClick={newComment}>New Comment</Button>
                )
            ]}>
                <section className='post-body'>
                    {
                        post.imageURL &&
                        <Image className='post-image'
                               src={post.imageURL}
                               height={150}
                               alt='post-image' />
                    }
                    {post.content}
                </section>
            </PostCard>
        </Col>
        {
            withPreview &&
            <CommentsPreview comments={post.comments} />
        }
    </Row>
)

export default PostItem;
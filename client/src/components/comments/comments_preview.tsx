import React from 'react';
import { Comment } from '../../interfaces';
import {CommentsPreviewCard, CommentsPreviewWrapper} from "./styles";
import {Col, Image, Row} from "antd";

interface Props {
    comments: Comment[];
}

const convertComments = (comments : Comment[]) => (
    comments.slice(0, 3).map((comment : Comment, idx : number) => (
        <Row key={idx}>
            <Col span={24}>
                <CommentsPreviewCard title={comment.author.username}>
                    <section className='comment-body'>
                        {
                            comment.imageURL &&
                            <Image className='comment-image'
                                   src={comment.imageURL}
                                   width={140}
                                   height={115}
                                   alt='comment-image' />
                        }
                        {comment.content}
                    </section>
                </CommentsPreviewCard>
            </Col>
        </Row>
    ))
)

const CommentsPreview : React.FC<Props> = ({ comments }) => (
    <CommentsPreviewWrapper span={8} style={{padding: '0 8px'}}>
        {
            comments &&
            convertComments(comments)
        }
    </CommentsPreviewWrapper>
);

export default CommentsPreview;
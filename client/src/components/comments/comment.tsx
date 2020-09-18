import React from 'react';
import { Comment } from '../../interfaces';
import {CommentCard, RepliesList} from "./styles";
import {Button, Image} from "antd";
import { HashLink as Link } from 'react-router-hash-link';

interface Props {
    comment: Comment;
    handleReply: (id : number) => void;
}

const convertReplies = (replies : Comment[]) =>
    replies.map(reply => <Link to={`#comment-${reply.ID}`}>{`#${reply.ID}`}</Link>)

const CommentItem : React.FC<Props> = ({ comment , handleReply }) => (
    <CommentCard id={`comment-${comment.ID}`} title={
        <section className='comment-header'>
            {comment.author.username}
            <Button type='text' onClick={() => handleReply(comment.ID)}>Reply</Button>
        </section>
    }>
        <RepliesList>
            {
                comment.replies?.length > 0 &&
                convertReplies(comment.replies)
            }
        </RepliesList>
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
            <span className='comment-id'>{comment.ID}</span>
        </section>
    </CommentCard>
);

export default CommentItem;
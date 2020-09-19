import React from 'react';
import { Comment } from '../../interfaces';
import {CommentCard, RepliesList, CommentText} from "./styles";
import {Button, Image} from "antd";
import { HashLink as Link } from 'react-router-hash-link';
import CommentPreview from "./comment_preview";

interface Props {
    comment: Comment;
    handleReply?: (id : number) => void;
}

const convertReplies = (replies : Comment[]) =>
    replies.map(reply =>
        <CommentPreview previewId={reply.ID}>
            <Link to={`#comment-${reply.ID}`}>{`#${reply.ID}`}</Link>
        </CommentPreview>)

const CommentItem : React.FC<Props> = ({ comment , handleReply }) => (
    <CommentCard id={`comment-${comment.ID}`} title={
        <section className='comment-header'>
            {comment.author.username}
            {
                handleReply &&
                <Button type='text' onClick={() => handleReply(comment.ID)}>Reply</Button>
            }
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
            <CommentText>
                {
                    comment.replyTo > 0 &&
                    <CommentPreview previewId={comment.replyTo}>
                        <Link to={`#comment-${comment.replyTo}`}>{`@${comment.replyTo}`}</Link>
                    </CommentPreview>
                }
                {comment.content}
            </CommentText>
            <span className='comment-id'>{comment.ID}</span>
        </section>
    </CommentCard>
);

export default CommentItem;
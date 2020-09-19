import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../reducers/root_reducer";
import {Comment} from "../../interfaces";
import CommentItem from "./comment";
import {Popover} from "antd";

interface Props {
    comments: Comment[];
    previewId: number;
    children: React.ReactNode;
}

const getComment = (commentId : number, comments : Comment[]) => {
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].ID === commentId) return comments[i];
    }
}

const CommentPreview : React.FC<Props> = ({comments,
previewId,
children}) => {
    const comment = getComment(previewId, comments);
    if (!comment) return null;

    return (
            <Popover content={
                <CommentItem comment={comment}/>
            }>
                    {children}
            </Popover>
    )
};

const mapStateToProps = (state : RootState) => ({
    comments: state.entities.comments
});

export default connect(mapStateToProps, {})(CommentPreview);
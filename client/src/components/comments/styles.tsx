import styled from "styled-components";
import {Card, Col} from "antd";

export const CommentsPreviewWrapper = styled(Col)`
    max-height: 280px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 0.3em;
    }
       
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #fff;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: $deep-pink;
    }
`

export const CommentsPreviewCard = styled(Card)`
    margin-bottom: 8px;
    
    .ant-card-head {
        min-height: 0;

        .ant-card-head-title {
            color: #fff;
            padding: 4px 0;
        }
    }
    
    .comment-image {
        min-width: 140px;
        max-width: 140px;
        margin-right: 16px;
        background-color: #000000;
        border-radius: 4px;
        cursor: pointer;

        img {
            object-fit: contain;
        }
    }
    
    .comment-body {
        display: flex;
        flex-direction: row;
    }
    
    .ant-card-body {
        max-height: 160px;
        word-break: break-word;
        overflow: hidden;
        padding: 24px 24px 0 24px;
        border-bottom: 24px solid transparent;
        color: #fff;
    }
`;

export const CommentCard = styled(Card)`
    min-width: 50%;
    max-width: 79.7%;
    color: #fff;
    margin-bottom: 12px;
    
    .comment-image {
        min-width: 140px;
        max-width: 140px;
        margin-right: 16px;
        background-color: #000000;
        border-radius: 4px;
        cursor: pointer;

        img {
            object-fit: contain;
        }
    }
    
    .comment-id {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 0.875em;
        opacity: 0.75;
        padding: 2px 4px;
        border-radius: 4px 0 4px 0;
        background: rgba(255, 255, 255, 0.1);
    }
    
    .comment-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .comment-body {
        display: flex;
        flex-direction: row;
    }
    
    .ant-card-head {
        min-height: 0;
    }
    
    .ant-card-head-title {
        padding: 8px 0;
        color: #fff;
    }
    
    .ant-card-body {
        padding-top: 8px;
        word-break: break-word;
    }
    
    button {
        padding: 2px 0;
        border: none;
    }
`;

export const RepliesList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    min-height: 18px;
    margin-bottom: 0;
    
    a {
        font-weight: bold;
        margin-left: 8px;
    }
`;
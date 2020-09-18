import styled from "styled-components";
import {Card} from "antd";

export const PostCard = styled(Card)`
        .post-image {
            min-width: 200px;
            max-width: 200px;
            margin-right: 16px;
            background-color: #000000;
            border-radius: 4px;
            cursor: pointer;

            img {
                object-fit: contain;
            }
        }
        
        .post-title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .anticon-user {
                margin-right: 4px;
            }
        }
        
        .ant-card-head {
            min-height: 0px;
        }
        
        .ant-card-head-title {
            font-size: 1.25em;
            padding: 8px 0;
            color: #fff;

            h4 {
                color: #fff;
                padding: 0;
                margin: 0;
            }
        }

        .ant-card-body {
            min-height: 150px;
            color: #fff;

            .post-body {
                display: flex;
                flex-direction: row;
            }
        }
        
        .ant-card-actions > li > span a:not(.ant-btn) {
            color: #fff;
            
            &:hover {
                color: #1890ff;
            }
        
    }
`;
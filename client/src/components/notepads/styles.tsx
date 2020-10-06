import styled from "styled-components";
import {Space, Col} from "antd";

export const NotepadIndexWrapper = styled(Space)`
    width: 100%;
    padding: 24px 32px;
    
    h1 {
        color: #fff;
    }

    .ant-card {
        transition: ease-in-out 1s;
    }

    .ant-card-head-title {
        span {
            display: inline-block;
            line-height: 32px;
            vertical-align: top;
        }
    }

    .loading-icon {
        margin-top: 10%;
    }
    
    @media (max-width: 768px) {
        padding: 24px;
        margin-bottom: 48px;
        
        .ant-space-item {
            margin-bottom: 0 !important;
        }
    }
`

export const NotepadIndexItemWrapper = styled(Col)`
    width: 100%;
    padding: 4px 8px;
    
    .notepad-index-item-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        .anticon {
            color: #fff;
        }
    }
    
    @media (max-width: 768px) {
        padding: 8px 0;
    }
`
import styled from "styled-components";
import {Col, Space} from "antd";

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
`

export const NotepadIndexItemWrapper = styled.div`
    .notepad-index-item-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        .anticon {
            color: #fff;
        }
    }
`
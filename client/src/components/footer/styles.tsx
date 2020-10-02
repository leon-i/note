import styled from "styled-components";
import {Layout} from "antd";

const { Footer } = Layout;

export const StyledFooter = styled(Footer)`
    position: fixed;
    z-index: 10;
    bottom: 0;
    width: 100%;
    padding: 0;
    background: #212121;
    
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        padding: 20px 36px;
        background: transparent;
        border: none;
        color: white;
        
        h2 {
            font-size: 28px;
            line-height: 0;
            margin: -2px 0 0 0;
            transition: ease-in-out 0.2s;
            
            &:hover {
                color: #1890ff;
                transition: ease-in-out 0.2s;
            }
        }
    }
    
    .anticon svg {
        font-size: 20px;
        transition: ease-in-out 0.2s;
        
        &:hover {
            color: #1890ff;
            transition: ease-in-out 0.2s;
        }
    }
`
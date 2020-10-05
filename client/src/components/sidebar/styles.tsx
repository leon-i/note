import styled from "styled-components";

export const Logo = styled.h2`
    font-size: 32px;
    margin: 4px 16px 10px 20px;
    
    a {
        color: #fff;
        
        &:hover {
            color: #1890ff;
        }
    }
`;

export const FavoritesMenuWrapper = styled.div`
    h4, h5 {
        color: #fff;
        margin-bottom: 0;
    }
    
    h5 {
        font-weight: normal;
    }
    
    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
        background: transparent;
    }
    
    .ant-menu-submenu-title {
        span {
            font-size: 1.1em;
        }
    }
    
    .ant-menu-sub {
        min-height: 100px;
    }
`

export const SessionButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
    margin: 12px 0;
`;
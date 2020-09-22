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
    margin-top: 10%;
    
    h4, h5 {
        color: #fff;
        margin-left: 16px;
        margin-bottom: 0;
    }
    
    h5 {
        font-weight: normal;
    }
    
    .ant-typography + h5.ant-typography {
        margin-top: 0;
    }
`
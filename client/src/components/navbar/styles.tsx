import styled from "styled-components";

export const StyledNav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h2 {
        font-size: 2em;
    }

    .ant-btn-primary {
        margin-left: 2em;
        font-weight: bold;
    }

    .ant-breadcrumb {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .ant-breadcrumb > span:last-child a {
        color: #fff;
    }

    .ant-breadcrumb-link a, .ant-breadcrumb-separator {
        font-size: 1.4em;
    }
    
    @media (max-width: 768px) {
        .session-btns {
            display: none;
        }
    }
`
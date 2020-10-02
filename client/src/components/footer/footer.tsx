import React from "react";
import {Link} from 'react-router-dom';
import {MenuOutlined} from '@ant-design/icons';
import {StyledFooter} from "./styles";
import {Logo} from "../sidebar/styles";

interface Props {
    toggleSider: () => void;
}


const Footer : React.FC<Props> = ({ toggleSider }) => {
    return (
        <StyledFooter>
            <nav>
                <Logo>
                    <Link to='/'>
                        note
                    </Link>
                </Logo>
                <MenuOutlined onClick={toggleSider} />
            </nav>
        </StyledFooter>
    )
}

export default Footer;
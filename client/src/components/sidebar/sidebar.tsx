import React, { useState, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FavoritesIndex from "./favorites_index";
import SessionButton from "../session/session_button";
import { Logo, SessionButtonsWrapper } from './styles';
import {RootState} from "../../reducers/root_reducer";

const NotepadForm = lazy(() => import('../notepads/notepad_form'));

interface Props {
    isMobile: boolean;
    isAuthenticated: boolean;
}

const Sidebar : React.FC<Props> = ({ isMobile, isAuthenticated }) => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [loadingState, setLoadingState] = useState<boolean>(false);
    
    return (
        <>
            <Logo>
                <Link to='/'>
                    note
                </Link>
            </Logo>
            {
                (isMobile && !isAuthenticated) &&
                <SessionButtonsWrapper>
                    <SessionButton formType={'register'}
                                   loadingState={loadingState}
                                   setLoadingState={setLoadingState} />
                    <SessionButton formType={'login'}
                                   loadingState={loadingState}
                                   setLoadingState={setLoadingState}/>
                </SessionButtonsWrapper>
            }
            <Menu
            mode="inline"
            theme='dark'
            selectable={false}
            style={{ borderRight: 0 }}
            >
                <Menu.Item key="1"
                    icon={<PlusOutlined />}
                    onClick={() => setModalState(true)}>Create Notepad</Menu.Item>
            </Menu>
            <FavoritesIndex />
            <Suspense fallback={<div>Loading...</div>}>
                <NotepadForm visible={modalState} closeModal={() => setModalState(false)} />
            </Suspense>
        </ >
    )
}

const mapStateToProps = (state : RootState) => ({
    isAuthenticated: state.session.isAuthenticated
});

export default connect(mapStateToProps, {})(Sidebar);
import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FavoritesIndex from "./favorites_index";
import { Logo } from './styles';

const NotepadForm = lazy(() => import('../notepads/notepad_form'));

const Sidebar = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    
    return (
        <>
            <Logo>
                <Link to='/'>
                    note
                </Link>
            </Logo>
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

export default Sidebar;
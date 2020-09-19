import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NotepadForm from '../notepads/notepad_form';
import FavoritesIndex from "./favorites_index";
import { Logo } from './styles';

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
            <NotepadForm visible={modalState} closeModal={() => setModalState(false)} />
        </ >
    )
}

export default Sidebar;
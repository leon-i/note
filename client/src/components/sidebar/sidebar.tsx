import React, { useState } from 'react';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NotepadForm from '../notepads/notepad_form';

const Sidebar = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    
    return (
        <>
            <h2 className='logo'>note</h2>
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
            <NotepadForm visible={modalState} closeModal={() => setModalState(false)} />
        </ >
    )
}

export default Sidebar;
import React from 'react';
import { Card, Col } from 'antd';
import { Notepad } from '../../interfaces';
import { Link } from 'react-router-dom';

interface Props {
    notepad: Notepad;
    idx: number;
}

const NotepadIndexItem : React.FC<Props> = ({ notepad, idx }) => (
    <Col span={5}>
        <Card key={idx} title={
            <Link to={`/${notepad.ID}`}>
                <span>#</span>{notepad.name}
            </Link>
        }>
            <p>{notepad.description}</p>
        </Card>
    </Col>
)

export default NotepadIndexItem;
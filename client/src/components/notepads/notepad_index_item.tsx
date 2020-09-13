import React from 'react';
import { Card, Col } from 'antd';
import { Notepad } from '../../interfaces';
import { Link } from 'react-router-dom';

interface Props {
    notepad: Notepad;
    idx: number;
    loading: boolean;
}

const NotepadIndexItem : React.FC<Props> = ({ notepad, idx, loading }) => (
    <Col span={6} style={{ padding: '4px 8px'}}>
        <Card key={idx} title={
            !loading &&
            <Link to={`/Notepads/${notepad.ID}`}>
                <span>#</span>{notepad.name}
            </Link>
        }
        loading={loading}>
            <p>{notepad.description}</p>
        </Card>
    </Col>
)

export default NotepadIndexItem;
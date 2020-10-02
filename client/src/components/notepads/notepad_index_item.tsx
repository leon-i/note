import React from 'react';
import {Card, Col} from 'antd';
import { Notepad } from '../../interfaces';
import { Link } from 'react-router-dom';
import FavoriteButton from "./favorite_button";
import {NotepadIndexItemWrapper} from "./styles";

interface Props {
    notepad: Notepad;
    idx: number;
    loading: boolean;
}

const NotepadIndexItem : React.FC<Props> = ({ notepad, idx, loading }) => (
        <Col lg={6} sm={24} style={{width: '100%', padding: '4px 8px'}}>
            <NotepadIndexItemWrapper>
                <Card key={idx} title={
                    !loading &&
                    <div className='notepad-index-item-title'>
                        <Link to={`/Notepads/${notepad.ID}`}>
                            <span>#</span>{notepad.name}
                        </Link>
                        <FavoriteButton notepadId={notepad.ID} />
                    </div>
                }
                loading={loading}>
                    <p>{notepad.description}</p>
                </Card>
            </NotepadIndexItemWrapper>
        </Col>
)

export default NotepadIndexItem;
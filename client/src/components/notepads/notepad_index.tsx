import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import { Notepad } from '../../interfaces';
import { fetchNotepads } from '../../actions/notepad_actions';
import { Space, Row, Col, Typography } from 'antd';
import NotepadIndexItem from './notepad_index_item';

interface Props {
    notepads: Notepad[];
    fetchNotepads: typeof fetchNotepads;
}

const notepadConvert = (notepads : Notepad[]) => (
    notepads.map((notepad, idx) => <NotepadIndexItem notepad={notepad} key={idx} idx={idx} />)
);

const NotepadIndex : React.FC<Props> = ({ notepads, fetchNotepads }) => {
    useEffect(() => {
        fetchNotepads();
    }, [fetchNotepads])

    const notepadItems = notepadConvert(notepads);

    return (
        <Space className='notepad-index' direction='vertical'>
            <Row>
                <Col span={24}>
                    <Typography.Title level={1}>Notepads</Typography.Title>
                </Col>
            </Row>
            {
                notepadItems.length > 0 &&
                <Row>
                    {notepadItems.slice(0, 4)}
                </Row>
            }
            {
                notepadItems.length > 4 &&
                <Row>
                    {notepadItems.slice(4)}
                </Row>
            }
        </Space>
    )
}

const mapStateToProps = (state : RootState) => ({
    notepads: state.entities.notepads
});

const mapDispatchToProps = ({
    fetchNotepads
});

export default connect(mapStateToProps, mapDispatchToProps)(NotepadIndex);
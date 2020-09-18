import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import { NotepadState } from '../../reducers/entities/entities_reducer';
import { Notepad } from '../../interfaces';
import { fetchNotepads } from '../../actions/notepad_actions';
import { Row, Col, Typography } from 'antd';
import { NotepadIndexWrapper } from "./styles";

import NotepadIndexItem from './notepad_index_item';

interface Props {
    notepads: NotepadState;
    fetchNotepads: typeof fetchNotepads;
}

const notepadConvert = (notepads : Notepad[], loading : boolean) => {
    const items = notepads.map((notepad, idx) => <NotepadIndexItem notepad={notepad} key={idx} idx={idx} loading={loading} />)

    return (
        <>
            <Row>
                {items.slice(0, 4)}
            </Row>
            <Row>
                {items.slice(4)}
            </Row>
        </>
    );
};

const NotepadIndex : React.FC<Props> = ({ notepads, fetchNotepads }) => {
    const [fetchingState, setFetchingState] = useState<boolean>(false);

    useEffect(() => {
        setFetchingState(true);
        fetchNotepads().then(() => {
            setTimeout(() => {
                setFetchingState(false);
            }, 200)
        });
    }, [fetchNotepads])

    const notepadItems = notepadConvert(notepads, fetchingState);

    return (
        <NotepadIndexWrapper direction='vertical'>
            <Row>
                <Col span={24}>
                    <Typography.Title level={1}>Notepads</Typography.Title>
                </Col>
            </Row>
            { notepadItems }
        </NotepadIndexWrapper>
    )
}

const mapStateToProps = (state : RootState) => ({
    notepads: state.entities.notepads
});

const mapDispatchToProps = ({
    fetchNotepads
});

export default connect(mapStateToProps, mapDispatchToProps)(NotepadIndex);
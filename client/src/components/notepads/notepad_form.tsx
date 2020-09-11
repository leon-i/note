import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import {  NewNotepad } from '../../interfaces';
import { createNotepad, clearNotepadErrors } from '../../actions/notepad_actions';
import {
    Modal,
    Form,
    Input
} from 'antd';

interface Props {
    user_id: number | null;
    errors: string | null;
    visible: boolean;
    closeModal: () => void;
    createNotepad: typeof createNotepad;
    clearNotepadErrors: typeof clearNotepadErrors;
}

const NotepadForm : React.FC<Props> = ({ user_id, errors, visible, closeModal, createNotepad, clearNotepadErrors }) => {
    const [form] = Form.useForm();
    const handleSubmit = async(values : NewNotepad) => {
        await createNotepad(Object.assign({}, values, user_id));
        form.validateFields(['name'])
            .then(() => closeModal())
            .catch(() => null);
    }

    const waitForReset = () => (
        new Promise((resolve) => {
            resolve(clearNotepadErrors());
        })
    );

    const handleOk = () => {
        waitForReset().then(() => {
            form.submit();
        })
    };

    return (
        <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={closeModal}
            okText='Create Notepad'>
            <Form
                className='notepad-form'
                form={form}
                name="notepad"
                onFinish={handleSubmit}
                initialValues={{
                    name: '',
                    description: ''
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label='Notepad name'
                    colon={false}
                    rules={[{ required: true, 
                        message: 'Please input your notepad name!', 
                        whitespace: true },
                        () => ({
                            validator() {
                            if (errors) {
                                return Promise.reject(errors);
                            }
    
                            return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input style={{ border: '1px solid #888888' }} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label='Notepad description'
                    colon={false}
                    rules={[{ required: true, 
                        message: 'Please input your notepad description!', 
                        whitespace: true },
                    ]}
                >
                    <Input style={{ border: '1px solid #888888' }} />
                </Form.Item>
            </Form> 
        </Modal>
    )
}

const mapStateToProps = (state : RootState) => ({
    user_id: state.session.currentUserId,
    errors: state.errors.notepad
});

const mapDispatchToProps = ({
    createNotepad,
    clearNotepadErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(NotepadForm);
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../reducers/root_reducer';
import {  NewNotepad, Notepad } from '../../interfaces';
import { createNotepad, clearNotepadErrors } from '../../actions/notepad_actions';
import { handleOk } from "../../util/form_util";
import {
    Modal,
    Form,
    Input,
    Typography
} from 'antd';
import { FormWrapper } from "../../styles/form";

interface Props {
    user_id: number | null;
    errors: string | null;
    visible: boolean;
    closeModal: () => void;
    createNotepad: typeof createNotepad;
    clearNotepadErrors: typeof clearNotepadErrors;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
};

const NotepadForm : React.FC<Props & RouteComponentProps> = ({ user_id, 
errors, 
visible, 
history, 
closeModal, 
createNotepad, 
clearNotepadErrors }) => {
    const [form] = Form.useForm();
    const handleSubmit = async(values : NewNotepad) => {
        createNotepad(Object.assign({}, values, user_id)).then((notepad : Notepad) => {
            form.validateFields(['name'])
                .then(() => {
                    history.push(`/Notepads/${notepad.ID}`);
                    closeModal();
                })
                .catch(() => null);
        });
    }

    return (
        <Modal
            visible={visible}
            onOk={handleOk(clearNotepadErrors, form)}
            onCancel={closeModal}
            okText='Create Notepad'>
            <Typography.Title level={3} style={{ color: '#fff', marginBottom: '1em' }}>Create a Notepad</Typography.Title>
            <FormWrapper>
                <Form
                    {...layout}
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
                        <Input.TextArea style={{ border: '1px solid #888888' }} />
                    </Form.Item>
                </Form>
            </FormWrapper>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotepadForm));
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import {  NewPost } from '../../interfaces';
import { createPost, clearPostErrors } from '../../actions/post_actions';
import { handleOk, handleImageFile } from "../../util/form_util";
import {
    Modal,
    Form,
    Input,
    Typography,
} from 'antd';
import { FormWrapper } from "../../styles/form";

interface Props {
    userId: number | null;
    notepadId: number | null;
    notepadName: string;
    errors: string | null;
    visible: boolean;
    closeModal: () => void;
    createPost: typeof createPost;
    clearPostErrors: typeof clearPostErrors;
}

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
};

const PostForm : React.FC<Props> = ({ userId, notepadId, notepadName, errors, visible, closeModal, createPost, clearPostErrors }) => {
    const [form] = Form.useForm();
    const formData = new FormData();
    const [imageState, setImageState] = useState('');
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const handleSubmit = async(values : NewPost) => {
        setLoadingState(true);
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('UserID', String(userId));
        formData.append('NotepadID', String(notepadId));
        formData.append('image', imageState)
        await createPost(formData);
        setLoadingState(false);
        form.validateFields(['title'])
            .then(() => closeModal())
            .catch(() => null)
    }

    return (
        <Modal
            visible={visible}
            onOk={handleOk(clearPostErrors, form)}
            onCancel={closeModal}
            okText='Create Post'
            okButtonProps={{loading: loadingState}}>
            <Typography.Title level={3} style={{ color: '#fff', marginBottom: '1em' }}>
                {`Post to #${notepadName}`}
            </Typography.Title>
            <FormWrapper>
                <Form
                    {...layout}
                    className='post-form'
                    form={form}
                    name="post"
                    onFinish={handleSubmit}
                    initialValues={{
                        name: '',
                        description: ''
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="title"
                        label='Post title'
                        colon={false}
                        rules={[{ required: true,
                            message: 'Please input your post title!',
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
                        name="content"
                        label='Post content'
                        colon={false}
                        rules={[{ required: true,
                            message: 'Please input your post content!',
                            whitespace: true },
                        ]}
                    >
                        <Input.TextArea style={{ border: '1px solid #888888' }} />
                    </Form.Item>
                    <Form.Item name="image"
                        label="Post image"
                        colon={false}
                        getValueFromEvent={(e : any) => handleImageFile(e, setImageState)}>
                            <input type="file" accept="image/*" />
                    </Form.Item>
                </Form>
            </FormWrapper>
        </Modal>
    )
}

const mapStateToProps = (state : RootState) => ({
    userId: state.session.currentUserId,
    errors: state.errors.post
});

const mapDispatchToProps = ({
    createPost,
    clearPostErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
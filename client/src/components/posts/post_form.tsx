import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import {  NewPost } from '../../interfaces';
import { createPost, clearPostErrors } from '../../actions/post_actions';
import {
    Modal,
    Form,
    Input,
    Typography
} from 'antd';

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
    const handleSubmit = async(values : NewPost) => {
        await createPost(Object.assign({}, values, { UserID: userId, NotepadID: notepadId }));
        form.validateFields(['Title'])
            .then(() => closeModal())
            .catch(() => null)
    }

    const waitForReset = () => (
        new Promise((resolve) => {
            resolve(clearPostErrors());
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
            okText='Create Post'>
            <Typography.Title level={3} style={{ color: '#fff', marginBottom: '1em' }}>{`Post to #${notepadName}`}</Typography.Title>
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
                    name="Title"
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
            </Form> 
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
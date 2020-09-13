import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import {  NewPost } from '../../interfaces';
import { createPost, clearPostErrors } from '../../actions/post_actions';
import {
    Modal,
    Form,
    Input
} from 'antd';

interface Props {
    user_id: number | null;
    notepad_id: number | null;
    errors: string | null;
    visible: boolean;
    closeModal: () => void;
    createPost: typeof createPost;
    clearPostErrors: typeof clearPostErrors;
}

const PostForm : React.FC<Props> = ({ user_id, notepad_id, errors, visible, closeModal, createPost, clearPostErrors }) => {
    const [form] = Form.useForm();
    const handleSubmit = async(values : NewPost) => {
        await createPost(Object.assign({}, values, user_id, notepad_id));
        form.validateFields(['title', 'content'])
            .then(() => closeModal())
            .catch(() => null);
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
            <Form
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
                    <Input style={{ border: '1px solid #888888' }} />
                </Form.Item>
            </Form> 
        </Modal>
    )
}

const mapStateToProps = (state : RootState) => ({
    user_id: state.session.currentUserId,
    errors: state.errors.post
});

const mapDispatchToProps = ({
    createPost,
    clearPostErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
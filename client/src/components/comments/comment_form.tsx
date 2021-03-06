import React, {useState} from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers/root_reducer';
import { createComment, clearCommentErrors } from '../../actions/comment_actions';
import { fetchPost } from "../../actions/post_actions";
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
    postId: number | null;
    replyId: number | null;
    errors: string | null;
    visible: boolean;
    closeModal: () => void;
    createComment: typeof createComment;
    fetchPost: typeof fetchPost;
    clearCommentErrors: typeof clearCommentErrors;
}

interface FormValues {
    content: string
}

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
};

const CommentForm : React.FC<Props> = ({ userId,
postId,
replyId,
errors,
visible,
closeModal,
createComment,
fetchPost,
clearCommentErrors,
 }) => {
    const [form] = Form.useForm();
    const formData = new FormData();
    const [imageState, setImageState] = useState('');
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const handleSubmit = async(values : FormValues) => {
        setLoadingState(true);
        formData.append('content', values.content);
        formData.append('UserID', String(userId));
        formData.append('PostID', String(postId));
        if (replyId !== null ) formData.append('ReplyID', String(replyId));
        formData.append('image', imageState);
        await createComment(formData);
        setLoadingState(false);
        form.validateFields(['content'])
            .then(() => {
                closeModal();
                fetchPost(postId);
            })
            .catch(() => null)
    }

    return (
        <Modal
            visible={visible}
            onOk={handleOk(clearCommentErrors, form)}
            onCancel={closeModal}
            okText='Create Comment'
            okButtonProps={{loading: loadingState}}>
                {
                    replyId && 
                    <Typography.Title level={3} style={{ color: '#fff', marginBottom: '1em' }}>
                        {`Reply to >>${replyId}`}
                    </Typography.Title>
                }
            <FormWrapper>
                <Form
                    {...layout}
                    className='comment-form'
                    form={form}
                    name="comment"
                    onFinish={handleSubmit}
                    initialValues={{
                        name: '',
                        description: ''
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="content"
                        label='Comment content'
                        colon={false}
                        rules={[{ required: true,
                            message: 'Please input your post content!',
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
                        <Input.TextArea style={{ border: '1px solid #888888' }} />
                    </Form.Item>
                    <Form.Item name="image"
                        label="Comment image"
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
    errors: state.errors.comment
});

const mapDispatchToProps = ({
    createComment,
    fetchPost,
    clearCommentErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
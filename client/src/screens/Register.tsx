import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NewUser } from '../interfaces';
import { register } from '../actions/user_actions';
import { RootState, ErrorState } from '../reducers/root_reducer';
import {
    Form,
    Input,
    Tooltip,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    errors: ErrorState;
    register: typeof register;
}

const Register : React.FC<Props> = ({ visible, setVisible, errors, register }) => {
    const { session } = errors;
    const [form] = Form.useForm();
    const [loadingState, setLoadingState] = React.useState<boolean>(false);
    const handleSubmit = async(values : NewUser) => {
        setLoadingState(true);
        await register(values);
        setLoadingState(false);
        form.validateFields(['username', 'email']);
    };
    
    return (
        <Modal visible={visible}
            onOk={form.submit}
            onCancel={() => setVisible(false)}
            okText='Register'
            okButtonProps={{loading: loadingState}}>
            <Form
                className='register-form'
                form={form}
                name="register"
                onFinish={handleSubmit}
                initialValues={{
                    username: '',
                    email: ''
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label={
                    <span>
                        Username&nbsp;
                        <Tooltip title="What do you want others to call you?">
                        <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                    }
                    rules={[{ required: true, 
                        message: 'Please input your username!', 
                        whitespace: true },
                        () => ({
                            validator() {
                            if (session['User.Username']) {
                                return Promise.reject(session['User.Username']);
                            }

                            return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    () => ({
                        validator() {
                        if (session['User.Email']) {
                            return Promise.reject(session['User.Email']);
                        }

                        return Promise.resolve();
                        },
                    }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        min: 6,
                        message: 'Password must be at least 6 characters'
                    }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
}

const mapStateToProps = (state : RootState) => ({
    errors: state.errors
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    register: (data : NewUser) => dispatch(register(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
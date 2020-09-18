import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Tooltip,
    Typography
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { NewUser } from '../../interfaces';
import { register } from '../../actions/user_actions';
import { RootState, ErrorState } from '../../reducers/root_reducer';
import {FormWrapper} from '../../styles/form';

interface Props {
    form: any;
    errors: ErrorState;
    register: typeof register;
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
};

const RegisterForm : React.FC<Props> = ({ form, errors, register, setLoadingState }) => {
    const { session } = errors;
    const handleSubmit = async(values : NewUser) => {
        setLoadingState(true);
        await register(values);
        form.validateFields(['username', 'email']);
        setLoadingState(false);
    };
    
    return (
        <>
        <Typography.Title level={3} style={{ color: '#fff', marginBottom: '1em' }}>Sign up for note</Typography.Title>
        <FormWrapper>
            <Form
                {...layout}
                className='register-form px4 py4'
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
                    colon={false}
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
                    <Input style={{ border: '1px solid #888888' }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    colon={false}
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
                    <Input style={{ border: '1px solid #888888' }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    colon={false}
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
                    <Input.Password style={{ border: '1px solid #888888' }} />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    colon={false}
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
                    <Input.Password style={{ border: '1px solid #888888' }} />
                </Form.Item>
            </Form>
        </FormWrapper>
        </>
    )
}

const mapStateToProps = (state : RootState) => ({
    errors: state.errors
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    register: (data : NewUser) => dispatch(register(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
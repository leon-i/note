import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Typography
} from 'antd';
import { LoginInput } from '../../interfaces';
import { login } from '../../actions/user_actions';
import { RootState, ErrorState } from '../../reducers/root_reducer';
import { FormWrapper } from "../../styles/form";

interface Props {
    form: any;
    errors: ErrorState;
    login: typeof login;
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
};

const LoginForm : React.FC<Props> = ({ form, errors, login, setLoadingState }) => {
    const { session } = errors;
    const handleSubmit = async(values : LoginInput) => {
        setLoadingState(true);
        await login(values);
        form.validateFields(['identity']);
        setLoadingState(false);
    };
    return (
        <>
        <Typography.Title level={3} style={{ color: '#fff', marginBottom: '1em' }}>Login to note</Typography.Title>
        <FormWrapper>
            <Form
                {...layout}
                className='login-form'
                form={form}
                name="login"
                onFinish={handleSubmit}
                initialValues={{
                    identity: ''
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="identity"
                    label='Username/Email'
                    colon={false}
                    rules={[{ required: true,
                        message: 'Please input your username/email!',
                        whitespace: true },
                        () => ({
                            validator() {
                            if (session['User.Identity']) {
                                return Promise.reject(session['User.Identity']);
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
                    },
                    () => ({
                        validator() {
                        if (session['User.Password']) {
                            return Promise.reject(session['User.Password']);
                        }

                        return Promise.resolve();
                        },
                    }),
                    ]}
                    hasFeedback
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
    login: (data : LoginInput) => dispatch(login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
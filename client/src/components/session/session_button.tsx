import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Form, Button
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import RegisterForm from './register_form';
import LoginForm from './login_form';
import { clearSessionErrors } from '../../actions/user_actions';

interface Props {
    formType: string;
    loadingState: boolean;
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
    clearSessionErrors: typeof clearSessionErrors;
}

const SessionButton : React.FC<Props> = ({ formType, loadingState, setLoadingState, clearSessionErrors }) => {
    const [registerForm] = Form.useForm();
    const [loginForm] = Form.useForm();
    const [modalState, setModalState] = useState<boolean>(false);

    const isRegister = formType === 'register';
    const modalButtonAction = isRegister ? registerForm.submit : loginForm.submit;

    const closeAndReset = () => {
        setModalState(false);
        registerForm.resetFields();
        loginForm.resetFields();
        clearSessionErrors();
    };

    const waitForReset = () => (
        new Promise((resolve) => {
            resolve(clearSessionErrors());
        })
    );

    const handleOk = () => {
        waitForReset().then(() => {
            modalButtonAction();
        })
    };
    
    return (
        <>
        <Button type={isRegister ? 'default' : 'primary'} onClick={() => setModalState(true)}>
            { formType }
        </Button>
        <Modal visible={modalState}
            onOk={handleOk}
            onCancel={() => closeAndReset()}
            okText={isRegister ? 'Register' : 'Login'}
            okButtonProps={{loading: loadingState}}>
                {
                    isRegister ? (
                        <RegisterForm form={registerForm} setLoadingState={setLoadingState} />
                    ) : (
                        <LoginForm form={loginForm} setLoadingState={setLoadingState} />
                    )
                }
        </Modal>
        </>
    );
}

const mapDispatchToProps = ({
    clearSessionErrors
})

export default connect(null, mapDispatchToProps)(SessionButton);
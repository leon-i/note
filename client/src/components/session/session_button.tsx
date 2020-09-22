import React, { useState, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    Form, Button
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { clearSessionErrors } from '../../actions/user_actions';

const RegisterForm = lazy(() => import('./register_form'));
const LoginForm = lazy(() => import('./login_form'));

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
            <Suspense fallback={<div>Loading...</div>}>
                {
                    isRegister ? (
                        <RegisterForm form={registerForm} setLoadingState={setLoadingState} />
                    ) : (
                        <LoginForm form={loginForm} setLoadingState={setLoadingState} />
                    )
                }
            </Suspense>
        </Modal>
        </>
    );
}

const mapDispatchToProps = ({
    clearSessionErrors
})

export default connect(null, mapDispatchToProps)(SessionButton);
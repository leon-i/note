import React, { useState, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { clearSessionErrors } from '../../actions/user_actions';
import {handleOk} from "../../util/form_util";
import {
Form,
Button,
Modal
} from 'antd';

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

    const closeAndReset = () => {
        setModalState(false);
        registerForm.resetFields();
        loginForm.resetFields();
        clearSessionErrors();
    };
    
    return (
        <>
        <Button type={isRegister ? 'default' : 'primary'} onClick={() => setModalState(true)}>
            { formType }
        </Button>
        <Modal visible={modalState}
            onOk={handleOk(clearSessionErrors, isRegister ? registerForm : loginForm)}
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
import React from 'react';
import { Modal, Form } from 'antd';

type ModalProps = React.ComponentProps<typeof Modal>
type FormProps = React.ComponentProps<typeof Form>

interface Props {
    modalChildren: React.ReactNode;
    modalProps: ModalProps;
    formChildren: React.ReactNode;
    formProps: FormProps;
}

const ModalForm : React.FC<Props> = ({ modalChildren, modalProps, formChildren, formProps}) => {
    return (
        <Modal {...modalProps}>
            {modalChildren}
            <Form {...formProps}>
                {formChildren }
            </Form>
        </Modal>
    )
};

export default ModalForm;
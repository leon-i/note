import { Dispatch, SetStateAction } from 'react';
import { clearCommentErrors } from "../actions/comment_actions";
import { clearSessionErrors } from "../actions/user_actions";
import { clearNotepadErrors } from "../actions/notepad_actions";
import { clearPostErrors } from "../actions/post_actions";
import { FormInstance } from "antd/lib/form";

type ClearErrorTypes = typeof clearCommentErrors |
    typeof clearSessionErrors |
    typeof clearNotepadErrors |
    typeof clearPostErrors

export const handleOk = (clearErrors : ClearErrorTypes, form : FormInstance) => () => {
    const waitForReset = () => new Promise((resolve => resolve(clearErrors())));

    waitForReset().then(() => form.submit());
};

export const handleImageFile = (e : any, setImageState : Dispatch<SetStateAction<string>>) => {
    const file = e.target.files[0];

    if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = () => {
            setImageState(file);
        }
    } else {
        return setImageState('');
    }
}
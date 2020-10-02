import {useState} from 'react';

type ClickEventTarget = EventTarget & ParentNode & Node | null;

const isChild = (child : ClickEventTarget, parent : HTMLElement) : boolean => {
    if (!child) return false;
    if (child === parent) return true;

    return isChild(child.parentNode, parent);
}

export const useSider = () => {
    const [siderStatus, setSiderStatus] = useState<boolean>(true);

    const handleOutsideClick = (e : MouseEvent) => {
        if (!isChild((e.target as ClickEventTarget ), (document.getElementById('sider') as HTMLElement))) {
            setSiderStatus(true);
            document.removeEventListener('click', handleOutsideClick);
        }
    }

    const toggleSider = () => {
        if (siderStatus) {
            setSiderStatus(!siderStatus);
            document.addEventListener('click', handleOutsideClick);
        } else {
            setSiderStatus(!siderStatus);
        }
    }

    return { siderStatus, toggleSider };
};
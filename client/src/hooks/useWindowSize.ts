import {useState, useLayoutEffect} from 'react';

export const useWindowSize = () => {
    const [sizeState, setSizeState] = useState([0, 0]);

    useLayoutEffect(() => {
        const updateSize = () => setSizeState([window.innerWidth, window.innerHeight]);

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return sizeState;
}
import React, { useEffect, useState } from 'react';
import s from './Snackbar.module.scss';

interface SnackbarProps {
    message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
    const [showSnackbar, setShowSnackbar] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSnackbar(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    return (
        <div className={`${s.snackbar} ${showSnackbar ? s.show : s.hide}`}>
            <span>{message}</span>
        </div>
    );
};

export default Snackbar;

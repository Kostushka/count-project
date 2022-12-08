import { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonType = {
    children: ReactNode;
    disabled: boolean | undefined;
    onClick: () => void;
};

function Button({ children, disabled, onClick, ...props }: ButtonType) {
    return (
        <button className={styles.button} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;

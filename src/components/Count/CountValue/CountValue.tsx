import { ReactNode } from 'react';
import styles from './CountValue.module.css';

type CountValueType = {
    countValue?: number;
    maxValue: number;
    children: ReactNode;
    error?: boolean;
    isChangeCount?: boolean;
};

function CountValue({
    children,
    countValue,
    maxValue,
    error,
    isChangeCount,
}: CountValueType) {
    return (
        <div
            className={`${styles.count} ${
                countValue === maxValue ? styles.red : ''
            } 
            `}
        >
            {error ? (
                <div className={styles.error}>Incorrect value!</div>
            ) : isChangeCount ? (
                <div className={styles.text}>Enter values and press 'set'</div>
            ) : (
                <>{children}</>
            )}
        </div>
    );
}
export default CountValue;

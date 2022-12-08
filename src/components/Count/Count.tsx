import { ReactNode } from 'react';
import CountValue from './CountValue';
import Button from '../UI/Button';
import styles from './Count.module.css';

type EntryFieldButtonsType = {
    id: number;
    name: Array<string>;
};

type CountType = {
    children: ReactNode;
    error?: boolean;
    errorSetDisabled?: boolean;
    countState?: boolean;
    stateSetButton?: boolean;
    countValue: number;
    maxValue: number;
    minValue: number;
    entryFieldButtons: EntryFieldButtonsType;
    setCountValue: (countValue: number) => void;
    setCountState?: (countState: boolean) => void;
};

function Count({
    error,
    errorSetDisabled,
    countState,
    stateSetButton,
    children,
    countValue,
    maxValue,
    minValue,
    setCountValue,
    entryFieldButtons,
    setCountState,
}: CountType) {
    const changeCountValue = (buttonName: string) => {
        switch (buttonName) {
            case 'inc':
                if (countValue < maxValue) {
                    setCountValue(countValue + 1);
                }
                break;
            case 'reset':
                setCountValue(minValue);
                break;
            case 'set':
                if (minValue) {
                    setCountValue(minValue);
                }
                if (setCountState) {
                    setCountState(false);
                }
                break;
        }
    };

    const disabled = (buttonName: string) => {
        switch (buttonName) {
            case 'inc':
                return countValue === maxValue || countState;
            case 'reset':
                return countValue === minValue || countState;
            case 'set':
                return minValue < 0 || !stateSetButton || errorSetDisabled;
        }
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.count__container}>
                    {/* Поле */}
                    <CountValue
                        error={error}
                        countState={countState}
                        countValue={countValue}
                        maxValue={maxValue}
                        children={children}
                    />
                </div>
                <div className={styles.button__container}>
                    {/* Кнопки */}
                    <>
                        {entryFieldButtons.name.map((el) => (
                            <Button
                                key={el}
                                children={el}
                                disabled={disabled(el)}
                                onClick={() => changeCountValue(el)}
                            />
                        ))}
                    </>
                </div>
            </div>
        </>
    );
}
export default Count;

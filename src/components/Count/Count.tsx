import { ReactNode } from 'react';
import CountValue from './CountValue';
import Button from '../UI/Button';
import styles from './Count.module.css';

type EntryFieldButtonsNameType = {
    name: Array<string>;
};

type CountType = {
    children: ReactNode;
    error?: boolean;
    errorValueForDisabledSetButton?: boolean;
    isChangeCount?: boolean;
    stateChangeCountForDisabledSetButton?: boolean;
    countValue: number;
    maxValue: number;
    minValue: number;
    entryFieldButtons: EntryFieldButtonsNameType;
    setCountValue: (countValue: number) => void;
    setIsChangeCount?: (isChangeCount: boolean) => void;
};

function Count({
    error,
    errorValueForDisabledSetButton,
    isChangeCount,
    stateChangeCountForDisabledSetButton,
    children,
    countValue,
    maxValue,
    minValue,
    setCountValue,
    entryFieldButtons,
    setIsChangeCount,
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
                if (setIsChangeCount) {
                    setIsChangeCount(false);
                }
                break;
        }
    };

    const disabled = (buttonName: string) => {
        switch (buttonName) {
            case 'inc':
                return countValue === maxValue || isChangeCount;
            case 'reset':
                return countValue === minValue || isChangeCount;
            case 'set':
                return (
                    minValue < 0 ||
                    !stateChangeCountForDisabledSetButton ||
                    errorValueForDisabledSetButton
                );
        }
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.count__container}>
                    {/* Поле со значением или с настройками счетчика */}
                    <CountValue
                        error={error}
                        isChangeCount={isChangeCount}
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

import Input from '../UI/Input';
import styles from './CountSettings.module.css';

type CountSettingsType = {
    error: boolean;
    inputMaxValue: number;
    inputStartValue: number;
    setInputStartValue: (inputStartValue: number) => void;
    setInputMaxValue: (inputMaxValue: number) => void;
    setIsChangeCount: (isChangeCount: boolean) => void;
};

function CountSettings({
    error,
    inputMaxValue,
    inputStartValue,
    setInputMaxValue,
    setInputStartValue,
    setIsChangeCount,
}: CountSettingsType) {
    const changeInputMaxHandler = (number: number) => {
        setInputMaxValue(number);
        setIsChangeCount(true);
    };
    const changeInputStartHandler = (number: number) => {
        setInputStartValue(number);
        setIsChangeCount(true);
    };
    return (
        <div className={styles.settings}>
            {/* максимальное значение счетчика */}
            <div className={styles.field}>
                <div className={styles.span}> max value:</div>

                <Input
                    type={'number'}
                    inputValue={inputMaxValue}
                    setInputValue={(number: number) =>
                        changeInputMaxHandler(number)
                    }
                    error={(error && inputStartValue > 0) || inputMaxValue < 0}
                />
            </div>
            {/* стартовое значение счетчика */}
            <div className={styles.field}>
                <div className={styles.span}> start value:</div>

                <Input
                    type={'number'}
                    inputValue={inputStartValue}
                    setInputValue={(number: number) =>
                        changeInputStartHandler(number)
                    }
                    error={error}
                />
            </div>
        </div>
    );
}
export default CountSettings;

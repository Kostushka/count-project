import Input from '../UI/Input';
import styles from './CountSettings.module.css';

type CountSettingsType = {
    setCountState: (state: boolean) => void;
    error: boolean;
    setError: (error: boolean) => void;
    inputMaxValue: number;
    setInputMaxValue: (inputMaxValue: number) => void;
    inputStartValue: number;
    setInputStartValue: (inputStartValue: number) => void;
};

function CountSettings({
    setCountState,
    error,
    setError,
    inputMaxValue,
    inputStartValue,
    setInputMaxValue,
    setInputStartValue,
}: CountSettingsType) {
    const changeInputMaxHandler = (number: number) => {
        setInputMaxValue(number);
        setCountState(true);
        setError(inputStartValue > inputMaxValue);
    };
    const changeInputStartHandler = (number: number) => {
        setInputStartValue(number);
        setCountState(true);
        setError(inputStartValue > inputMaxValue || inputStartValue < 0);
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
                    error={error && inputStartValue > 0}
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

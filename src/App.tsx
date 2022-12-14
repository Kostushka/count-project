import { useEffect, useState } from 'react';
import CountSettings from './components/CountSettings';
import Count from './components/Count';

import styles from './App.module.css';
import CountWithSettings from './components/CountWithSettings';

function App() {
    // переменные для ключей
    const COUNT_1 = 'count1';
    const COUNT_2 = 'count2';

    type EntryFieldButtonsType = {
        [COUNT_1: string]: { name: Array<string> };
    };

    // массив имен кнопок для двух счетчиков
    const entryFieldButtons: EntryFieldButtonsType = {
        [COUNT_1]: { name: ['set'] },
        [COUNT_2]: { name: ['inc', 'reset'] },
    };

    // стейт для значения счетчика
    const [countValue, setCountValue] = useState<number>(0);

    // стейт для максимального и стартого значений
    const [inputMaxValue, setInputMaxValue] = useState<number>(5);
    const [inputStartValue, setInputStartValue] = useState<number>(0);

    // флаг для определения ошибочных максимального и стартого значений
    const [errorValue, setErrorValue] = useState<boolean>(false);

    // флаг для определения: изменяются ли поля максимального и стартого значений
    const [isChangeCount, setIsChangeCount] = useState<boolean>(false);

    // изменение флага с ошибкой при изменении стартого и максимального значений
    useEffect(() => {
        if (inputStartValue < 0 || inputStartValue >= inputMaxValue) {
            setErrorValue(true);
        } else {
            setErrorValue(false);
        }
    }, [inputStartValue, inputMaxValue]);

    return (
        <div className={styles.container}>
            <div className={styles.count}>
                {/* Поле настроек счетчика */}
                <Count
                    children={
                        <CountSettings
                            inputMaxValue={inputMaxValue}
                            setInputMaxValue={setInputMaxValue}
                            inputStartValue={inputStartValue}
                            setInputStartValue={setInputStartValue}
                            setIsChangeCount={setIsChangeCount}
                            error={errorValue}
                        />
                    }
                    countValue={countValue}
                    maxValue={inputMaxValue}
                    minValue={inputStartValue}
                    setCountValue={setCountValue}
                    entryFieldButtons={entryFieldButtons[COUNT_1]}
                    setIsChangeCount={setIsChangeCount}
                    stateChangeCountForDisabledSetButton={isChangeCount}
                    errorValueForDisabledSetButton={errorValue}
                />
                {/* Счетчик */}
                <Count
                    children={countValue}
                    countValue={countValue}
                    maxValue={inputMaxValue}
                    minValue={inputStartValue}
                    setCountValue={setCountValue}
                    entryFieldButtons={entryFieldButtons[COUNT_2]}
                    error={errorValue}
                    isChangeCount={isChangeCount}
                />
            </div>

            <div className={styles.count__settings}>
                {/* Счетчик с настройками */}
                <CountWithSettings />
            </div>
        </div>
    );
}

export default App;

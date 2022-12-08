import { useEffect, useState } from 'react';
import CountSettings from './components/CountSettings';
import Count from './components/Count/Count';

import styles from './App.module.css';

function App() {
    const COUNT_1 = 'count1';
    const COUNT_2 = 'count2';

    const [countValue, setCountValue] = useState<number>(0);

    const [inputMaxValue, setInputMaxValue] = useState<number>(5);
    const [inputStartValue, setInputStartValue] = useState<number>(0);

    const [error, setError] = useState<boolean>(false);

    const [countState, setCountState] = useState<boolean>(false);

    useEffect(() => {
        if (inputStartValue < 0 || inputStartValue >= inputMaxValue) {
            setError(true);
        } else {
            setError(false);
        }
    }, [inputStartValue]);

    type EntryFieldButtonsType = {
        [COUNT_1: string]: { id: number; name: Array<string> };
    };

    const entryFieldButtons: EntryFieldButtonsType = {
        [COUNT_1]: { id: 1, name: ['set'] },
        [COUNT_2]: { id: 2, name: ['inc', 'reset'] },
    };

    return (
        <div className={styles.container}>
            {/* Поле настроек счетчика */}
            <Count
                children={
                    <CountSettings
                        inputMaxValue={inputMaxValue}
                        setInputMaxValue={setInputMaxValue}
                        inputStartValue={inputStartValue}
                        setInputStartValue={setInputStartValue}
                        setCountState={setCountState}
                        error={error}
                        setError={setError}
                    />
                }
                countValue={countValue}
                maxValue={inputMaxValue}
                minValue={inputStartValue}
                setCountValue={setCountValue}
                entryFieldButtons={entryFieldButtons[COUNT_1]}
                setCountState={setCountState}
                stateSetButton={countState}
                errorSetDisabled={error}
            />
            {/* Счетчик */}
            <Count
                children={countValue}
                countValue={countValue}
                maxValue={inputMaxValue}
                minValue={inputStartValue}
                setCountValue={setCountValue}
                entryFieldButtons={entryFieldButtons[COUNT_2]}
                error={error}
                countState={countState}
            />
        </div>
    );
}

export default App;

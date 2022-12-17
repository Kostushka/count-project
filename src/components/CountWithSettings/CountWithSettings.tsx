import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';

import styles from './CountWithSettings.module.css';

function CountWithSettings() {
    // const buttons = ['inc', 'reset', 'set'];

    // обработчик клика: принимает имя кнопки, выполняет соответсвующее изменение данных для перерисовки
    // const buttonsNameHandler = (buttonName: string) => {
    //     switch (buttonName) {
    //         case 'set':
    //             setCountValue(minValue);
    //             setIsChangeValue(false);
    //             setIsVisibleSettings(!isVisibleSettings);
    //             break;
    //         case 'inc':
    //             if (countValue < maxValue) {
    //                 setCountValue(countValue + 1);
    //             }
    //             break;
    //         case 'reset':
    //             setCountValue(minValue);
    //     }
    // };

    // функция состояния активности кнопки: принимает имя, возвращает соответсвующее булево значение
    // const disabled = (buttonName: string) => {
    //     switch (buttonName) {
    //         case 'set':
    //             return error;
    //         case 'inc':
    //             return (
    //                 isChangeValue ||
    //                 countValue === maxValue ||
    //                 isVisibleSettings
    //             );
    //         case 'reset':
    //             return isChangeValue || countValue === minValue;
    //     }
    // };

    // флаг для определения ошибочных максимального и стартого значений
    const [error, setError] = useState<boolean>(false);

    // флаг для скрытия/показа настроек счетчика
    const [isVisibleSettings, setIsVisibleSettings] = useState<boolean>(false);

    // стейт для максимального и стартого значений
    const [maxValue, setMaxValue] = useState<number>(() => {
        // значение localStorage не перезатирается инициализационным значением при отрисовке
        const value = localStorage.getItem('max2');
        return value ? JSON.parse(value) : 5;
    });
    const [minValue, setMinValue] = useState<number>(() => {
        // значение localStorage не перезатирается инициализационным значением при отрисовке
        const value = localStorage.getItem('min2');
        return value ? JSON.parse(value) : 0;
    });

    // стейт для значения счетчика
    const [countValue, setCountValue] = useState<number>(minValue);

    // флаг для определения: изменяются ли поля настроек
    const [isChangeValue, setIsChangeValue] = useState<boolean>(false);

    // обработчик для изменения значения счетчика от start до max
    const changeCountValueHandler = () => {
        if (countValue < maxValue) {
            setCountValue(countValue + 1);
            // localStorage.setItem('value2', JSON.stringify(countValue + 1));
        }
    };
    // обработчик для открытия/закрытия поля настроек + изменения зачения счетчика
    const setValueHandler = () => {
        setCountValue(minValue);
        setIsChangeValue(false);
        setIsVisibleSettings(!isVisibleSettings);
    };

    // обработчик для изменения максимального значения счетчика
    const maxValueChangeHandler = (value: number) => {
        setMaxValue(value);
        setIsChangeValue(true);
    };

    // обработчик для изменения минимального значения счетчика
    const minValueChangeHandler = (value: number) => {
        setMinValue(value);
        setIsChangeValue(true);
    };

    // перерисовка при изменении стартового и макс занчений, чтобы обрабатывать ошибку
    useEffect(() => {
        // localStorage: сохраняем настройки
        localStorage.setItem('min2', JSON.stringify(minValue));
        localStorage.setItem('max2', JSON.stringify(maxValue));

        if (maxValue <= minValue || minValue < 0) {
            setError(true);
        } else {
            setError(false);
        }
    }, [minValue, maxValue]);

    // localStorage
    // useEffect(() => {
    //     localStorage.setItem('min2', JSON.stringify(minValue));
    //     localStorage.setItem('max2', JSON.stringify(maxValue));
    // }, [minValue, maxValue]);

    return (
        <div className={styles.container}>
            {isVisibleSettings ? (
                <div className={styles.count__container}>
                    <div className={styles.settings}>
                        <div className={styles.field}>
                            <div className={styles.span}> max value:</div>
                            <Input
                                style={{
                                    backgroundColor:
                                        (error && minValue > 0) || maxValue <= 0
                                            ? 'rgb(182, 82, 82)'
                                            : '',
                                }}
                                type='number'
                                inputValue={maxValue}
                                setInputValue={(value) =>
                                    maxValueChangeHandler(value)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <div className={styles.span}> start value:</div>
                            <Input
                                style={{
                                    backgroundColor: error
                                        ? 'rgb(182, 82, 82)'
                                        : '',
                                }}
                                type='number'
                                inputValue={minValue}
                                setInputValue={(value) =>
                                    minValueChangeHandler(value)
                                }
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.count__container}>
                    <div
                        className={`${styles.count} ${
                            countValue === maxValue ? styles.red : ''
                        } `}
                    >
                        {countValue}
                    </div>
                </div>
            )}
            <div className={styles.button__container}>
                {/* {buttons.map((el) => (
                    <Button
                        children={el}
                        disabled={disabled(el)}
                        onClick={() => buttonsNameHandler(el)}
                    />
                ))} */}
                {isVisibleSettings ? (
                    <>
                        <Button
                            children={'set'}
                            disabled={error}
                            onClick={setValueHandler}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            children={'inc'}
                            disabled={
                                isChangeValue ||
                                countValue === maxValue ||
                                isVisibleSettings
                            }
                            onClick={changeCountValueHandler}
                        />

                        <Button
                            children={'reset'}
                            disabled={isChangeValue || countValue === minValue}
                            onClick={() => setCountValue(minValue)}
                        />
                        <Button
                            children={'set'}
                            disabled={error}
                            onClick={setValueHandler}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default CountWithSettings;

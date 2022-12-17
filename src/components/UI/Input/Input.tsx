import styles from './Input.module.css';

type InputType = {
    style?: React.CSSProperties;
    type?: string;
    inputValue: number;
    setInputValue: (inputValue: number) => void;
    error?: boolean;
};

function Input({ inputValue, setInputValue, error, ...props }: InputType) {
    return (
        <input
            className={`${styles.input} ${error && styles.error}`}
            type={props.type}
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.currentTarget.value))}
            {...props}
        />
    );
}
export default Input;

import styles from './Input.module.css';
import InputProps from './InputTypes';

export default function Input({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  helperText,
  disabled,
  onChange,
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.input} ${error && styles.errorInput}`}
      />
      {helperText && (
        <p
          className={`${styles.helperText} ${error && styles.helperTextError}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

/* eslint-disable react/require-default-props */
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './TextField.module.css';

type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label: string;
  name: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function Comp(
  { label, name, error, ...inputProps },
  ref
) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        ref={ref}
        name={name}
        className={`${styles.input} ${error && styles.errorInput}`}
        {...inputProps}
      />
      <p className={`${styles.helperText} ${error && styles.helperTextError}`}>
        {error}
      </p>
    </div>
  );
});

export default TextField;

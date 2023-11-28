import { ChangeEvent } from 'react';

export default interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

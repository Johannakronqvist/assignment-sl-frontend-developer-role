import React, { FC, ChangeEvent } from 'react';
import styles from './input.module.css';

interface InputProps {
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ name, type, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {name}
      </label>
      <input
        className={styles.input}
        type={type}
        name={name}
        step='1'
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;

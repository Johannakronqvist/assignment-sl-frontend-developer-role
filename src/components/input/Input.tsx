import Reacct, { FC } from 'react';
import styles from './input.module.css';

interface InputProps {
  name: string;
  type: string;
}

const Input: FC<InputProps> = ({ name, type }) => {
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
        required
      />
    </div>
  );
};

export default Input;

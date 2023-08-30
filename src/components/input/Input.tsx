import Reacct, { FC } from 'react';
import Styles from './input.module.css';

interface InputProps {
  name: string;
  type: string;
}

const Input: FC<InputProps> = ({ name, type }) => {
  return (
    <div className={Styles.inputContainer}>
      <label className={Styles.label} htmlFor={name}>
        {name}
      </label>
      <input
        className={Styles.input}
        type={type}
        name={name}
        step='0.01'
        required
      />
    </div>
  );
};

export default Input;

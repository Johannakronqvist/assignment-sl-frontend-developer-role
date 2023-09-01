import React, { FC, ChangeEvent } from "react";
import styles from "./input.module.css";

const Input: FC<InputProps> = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={props.name}>
        {props.name}
      </label>
      <input
        className={styles.input}
        type={props.type}
        name={props.name}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
        required
      />
    </div>
  );
};

export default Input;

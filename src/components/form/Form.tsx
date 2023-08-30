'use client';
import React, { FC, FormEvent } from 'react';
const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission logic here
};

const Form: FC = () => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Form</h2>
      <label htmlFor='sizeMW'>text</label>
      <input type='number' name='sizeMW' required />
    </form>
  );
};

export default Form;

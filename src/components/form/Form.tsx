'use client';
import React, { FC, FormEvent } from 'react';
import styles from './form.module.css';
import Input from '../input/Input';

const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission logic here
};

const Form: FC = () => {
  return (
    <section>
      <h1>Fill in the fields to calculate LCOH and Cost Proportions</h1>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <section className={styles.formSection}>
          <h3>CAPEX for a Hydrogen Plant</h3>
          <Input name='sizeMW' type='number' />
          <Input name='hardwareCostPerMw' type='number' />
          <Input name='installationCostPerMw' type='number' />
        </section>
        <section className={styles.formSection}>
          <h3>Hydrogen Production Over Years</h3>
          <Input name='energyInput' type='number' />
          <Input name='SEC' type='number' />
          <Input name='degradationPerYear' type='number' />
          <Input name='years' type='number' />
        </section>
      </form>
    </section>
  );
};

export default Form;

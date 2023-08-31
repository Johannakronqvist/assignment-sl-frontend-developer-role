import useSWR, { Fetcher } from 'swr';
import React, { FC, FormEvent, useState, ChangeEvent } from 'react';
import styles from './form.module.css';
import Input from '../input/Input';

async function fetcher(endpoint: any) {
  const response = await fetch('/api/hello', {
    method: endpoint.body ? endpoint.body.method : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(endpoint.body.body),
  });
  const data = await response.json();

  return data;
}

interface Capex {
  sizewMw: number | null;
  hardwareCostPerMw: number | null;
  installationCostPerMw: number | null;
}

const Form: FC = () => {
  const [capexParameters, setCapexParameters] = useState<Capex>({
    sizewMw: null,
    hardwareCostPerMw: null,
    installationCostPerMw: null,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setCapexParameters((prevParameters) => ({
      ...prevParameters,
      [name]: value,
    }));
  };

  let body = {
    method: 'POST',
    body: { sizeMw: 100, hardwareCostPerMw: 800, installationCostPerMw: 200 },
  };

  const { data, error, isLoading } = useSWR({ url: '', body }, fetcher);

  // console.log('CAPEX data', data);
  // console.log('CAPEX error', error);
  // console.log('CAPEX isLoading', isLoading);

  return (
    <section>
      <h1>Fill in the fields to calculate LCOH and Cost Proportions</h1>

      <form onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <section className={styles.formSection}>
            <h3>CAPEX for a Hydrogen Plant</h3>
            <Input name='sizeMW' type='number' onChange={handleChange} />
            <Input
              name='hardwareCostPerMw'
              type='number'
              onChange={handleChange}
            />
            <Input
              name='installationCostPerMw'
              type='number'
              onChange={handleChange}
            />
          </section>
          <section className={styles.formSection}>
            <h3>Hydrogen Production Over Years</h3>
            <Input name='energyInput' type='number' onChange={handleChange} />
            <Input name='SEC' type='number' onChange={handleChange} />
            <Input
              name='degradationPerYear'
              type='number'
              onChange={handleChange}
            />
            <Input name='years' type='number' onChange={handleChange} />
          </section>
        </div>

        <button>Submit</button>
      </form>
    </section>
  );
};

export default Form;

import useSWR, { Fetcher } from 'swr';
import React, {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import styles from './form.module.css';
import Input from '../input/Input';

async function fetcher(endpoint: any) {
  const response = await fetch('/api/proxy?endpoint=CAPEX', {
    method: endpoint.body ? endpoint.body.method : 'GET',
    body: JSON.stringify(endpoint.body.body),
  });
  const data = await response.json();

  return data;
}

type Props = {
  setResult: Dispatch<SetStateAction<any>>;
};

interface ResponseParameters {
  capex: {
    installation: number | null;
    hardware: number | null;
  };
  h2Production: number[];
}

interface Parameters {
  sizeMw: number | null;
  hardwareCostPerMw: number | null;
  installationCostPerMw: number | null;
  energyInput: number | null;
  SEC: number | null;
  degradationPerYear: number | null;
  years: number | null;
}

const Form: FC<Props> = ({ setResult }) => {
  const [parameters, setParameters] = useState<Parameters>({
    sizeMw: null,
    hardwareCostPerMw: null,
    installationCostPerMw: null,
    energyInput: null,
    SEC: null,
    degradationPerYear: null,
    years: null,
  });

  const [capexResponse, setCapexResponse] = useState<
    ResponseParameters['capex']
  >({
    installation: null,
    hardware: null,
  });
  const [h2ProductionResponse, setH2ProductionResponse] = useState<
    ResponseParameters['h2Production']
  >([]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const capexResponse = await fetch('/api/proxy?endpoint=capex', {
        method: 'POST',
        body: JSON.stringify({
          sizeMw: parameters.sizeMw,
          hardwareCostPerMw: parameters.hardwareCostPerMw,
          installationCostPerMw: parameters.installationCostPerMw,
        }),
      });

      const capexData = await capexResponse.json();

      setCapexResponse({
        installation: capexData.data.installation,
        hardware: capexData.data.hardware,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const payload = {
        energyInput: parameters.energyInput,
        SEC: parameters.SEC,
        degradationPerYear: parameters.degradationPerYear,
        years: parameters.years,
      };
      console.log('Parameters are: ...', payload);
      const h2ProductionResponse = await fetch(
        '/api/proxy?endpoint=h2production',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      const h2ProductionData = await h2ProductionResponse.json();

      setH2ProductionResponse(h2ProductionData.data);
    } catch (error) {
      console.log(error);
    }

    try {
      console.log(capexResponse);
      console.log(h2ProductionResponse);
      const lcohResponse = await fetch('/api/proxy?endpoint=lcoh', {
        method: 'POST',
        body: JSON.stringify({
          capex: capexResponse,
          yearlyH2Production: h2ProductionResponse,
        }),
      });
      const lcohData = await lcohResponse.json();
      setResult(lcohData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, min, max, value } = e.target;
    const parsedValue = parseFloat(value);
    const parsedMin = parseFloat(min);
    const parsedMax = parseFloat(max);

    if (max !== undefined) {
      if (parsedValue < parsedMin) e.target.value = min;
    } else {
      if (parsedValue < parsedMin) e.target.value = min;
      if (parsedValue > parsedMax) e.target.value = max;
    }

    setParameters((prevParameters) => ({
      ...prevParameters,
      [name]: value,
    }));
  };

  return (
    <section>
      <h1>Fill in the fields to calculate LCOH and Cost Proportions</h1>

      <form onSubmit={onSubmitHandler}>
        <div className={styles.formContainer}>
          <section className={styles.formSection}>
            <h3>CAPEX for a Hydrogen Plant</h3>

            <Input
              name='sizeMw'
              type='number'
              min={0}
              step={1}
              onChange={handleChange}
            />
            <Input
              name='hardwareCostPerMw'
              type='number'
              min={0}
              step={1}
              onChange={handleChange}
            />
            <Input
              name='installationCostPerMw'
              type='number'
              min={0}
              step={1}
              onChange={handleChange}
            />
          </section>
          <section className={styles.formSection}>
            <h3>Hydrogen Production Over Years</h3>
            <Input
              name='energyInput'
              type='number'
              min={0}
              step={1}
              onChange={handleChange}
            />
            <Input
              name='SEC'
              type='number'
              min={0}
              step={1}
              onChange={handleChange}
            />
            <Input
              name='degradationPerYear'
              type='number'
              min={0.0}
              step={0.01}
              onChange={handleChange}
            />
            <Input
              name='years'
              type='number'
              min={0}
              step={1}
              onChange={handleChange}
            />
          </section>
        </div>

        <button>Submit</button>
      </form>
    </section>
  );
};

export default Form;

import React, {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import styles from './form.module.css';
import Input from '../input/Input';
import { fetchCapexData, fetchH2ProductionData } from '../../api/apiCalls';
import { validateParameters } from '../../utils/validationUtils';

type Props = {
  setResult: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<any>>;
};

interface Parameters {
  sizeMw: number | null;
  hardwareCostPerMw: number | null;
  installationCostPerMw: number | null;
  energyInput: number | null;
  SEC: number | null;
  degradationPerYear: number | null;
  years: number | null;
}

const capexInputs: {
  name: keyof Parameters;
  type: string;
  min: number;
  step: number;
}[] = [
  { name: 'sizeMw', type: 'number', min: 0, step: 1 },
  { name: 'hardwareCostPerMw', type: 'number', min: 0, step: 1 },
  { name: 'installationCostPerMw', type: 'number', min: 0, step: 1 },
];

const h2ProductionInputs: {
  name: keyof Parameters;
  type: string;
  min: number;
  step: number;
  max?: number;
}[] = [
  { name: 'energyInput', type: 'number', min: 0, step: 1 },
  { name: 'SEC', type: 'number', min: 0, step: 1 },
  { name: 'degradationPerYear', type: 'number', min: 0, max: 1, step: 0.01 },
  { name: 'years', type: 'number', min: 0, step: 1 },
];

const Form: FC<Props> = ({ setResult, setIsLoading }) => {
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [parameters, setParameters] = useState<Parameters>({
    sizeMw: 0,
    hardwareCostPerMw: 0,
    installationCostPerMw: 0,
    energyInput: 0,
    SEC: 0,
    degradationPerYear: 0,
    years: 0,
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

  const resetForm = () => {
    setParameters({
      sizeMw: 0,
      hardwareCostPerMw: 0,
      installationCostPerMw: 0,
      energyInput: 0,
      SEC: 0,
      degradationPerYear: 0,
      years: 0,
    });

    setErrors({});
  };

  useEffect(() => {
    if (
      capexResponse &&
      capexResponse.installation !== null &&
      capexResponse.hardware !== null &&
      h2ProductionResponse &&
      h2ProductionResponse.length > 0
    ) {
      const fetchData = async () => {
        try {
          const lcohResponse = await fetch('/api/proxy?endpoint=lcoh', {
            method: 'POST',
            body: JSON.stringify({
              capex: capexResponse,
              yearlyH2Production: h2ProductionResponse,
            }),
          });
          const lcohData = await lcohResponse.json();

          if (lcohData && lcohData.data) {
            setResult({
              lcoh: lcohData.data.LCOH,
              instalationCostProportion:
                lcohData.data.installationCostProportion,
              hardwareCostProportion: lcohData.data.hardwareCostProportion,
            });
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [capexResponse, h2ProductionResponse]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let tempErrors: { [key: string]: string | null } = {};

    try {
      const capexData = await fetchCapexData(parameters);
      setCapexResponse({
        installation: capexData.data.installation,
        hardware: capexData.data.hardware,
      });
    } catch (error: any) {
      tempErrors.capex = error.message;
      setIsLoading(false);
    }

    try {
      const h2ProductionData = await fetchH2ProductionData(parameters);
      setH2ProductionResponse(h2ProductionData.data);
    } catch (error: any) {
      tempErrors.h2Production = error.message;
      setIsLoading(false);
    }

    setErrors(tempErrors);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue = parseFloat(value);

    if (value === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
      setParameters((prevParameters) => ({
        ...prevParameters,
        [name]: null,
      }));
      return;
    }

    const newError = validateParameters(
      name as keyof ValidationParameters,
      parsedValue
    );

    setErrors((prevErrors) => ({ ...prevErrors, [name]: newError }));

    if (!newError) {
      setParameters((prevParameters) => ({
        ...prevParameters,
        [name]: parsedValue,
      }));
    }
  };

  return (
    <section>
      <h1>Fill in the fields to calculate LCOH and Cost Proportions</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={styles.formContainer}>
          <section className={styles.formSection}>
            <h3>CAPEX for a Hydrogen Plant</h3>
            {capexInputs.map((input) => (
              <Input
                key={input.name}
                name={input.name}
                type={input.type}
                min={input.min}
                step={input.step}
                onChange={handleChange}
                value={parameters[input.name] ?? ''}
              />
            ))}
          </section>
          <section className={styles.formSection}>
            <h3>Hydrogen Production Over Years</h3>
            {h2ProductionInputs.map((input) => (
              <Input
                key={input.name}
                name={input.name}
                type={input.type}
                min={input.min}
                step={input.step}
                onChange={handleChange}
                value={parameters[input.name] ?? ''}
              />
            ))}
          </section>
        </div>
        <button className={styles.button}>Submit</button>
        <button className={styles.button} type='button' onClick={resetForm}>
          Clear
        </button>
      </form>
      {Object.keys(errors).map((fieldName) => {
        return errors[fieldName] ? (
          <div key={fieldName} style={{ color: 'red' }}>
            {errors[fieldName]}
          </div>
        ) : null;
      })}{' '}
    </section>
  );
};

export default Form;

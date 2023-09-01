import React, { FC } from 'react';
import styles from './outputResult.module.css';
import Result from '../result/Result';

interface ResultParameters {
  lcoh: number | null;
  instalationCostProportion: number | null;
  hardwareCostProportion: number | null;
}

interface OutputResultProps {
  result: ResultParameters;
}

const OutputResult = ({ result }: OutputResultProps) => {
  return (
    <section>
      <h1>Result</h1>
      <section className={styles.resultSection}>
        <Result title='LCOH' result={result.lcoh} />
        <Result
          title='Instalation Cost Proportion'
          result={result.instalationCostProportion}
        />
        <Result
          title='Hardware Cost Proportion'
          result={result.hardwareCostProportion}
        />
      </section>
    </section>
  );
};

export default OutputResult;

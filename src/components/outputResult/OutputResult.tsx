import React, { FC } from 'react';
import styles from './outputResult.module.css';
import Result from '../result/Result';

interface OutputResultProps {}

const OutputResult: FC<OutputResultProps> = () => {
  return (
    <section>
      <h1>Result</h1>
      <section className={styles.resultSection}>
        <Result title='LCOH' result={244.8979591836735} />
        <Result title='Instalation Cost Proportion' result={0.2} />
        <Result title='Hardware Cost Proportion' result={0.8} />
      </section>
    </section>
  );
};

export default OutputResult;

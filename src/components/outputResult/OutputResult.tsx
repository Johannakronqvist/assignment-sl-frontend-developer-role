import Reacct, { FC } from 'react';
import styles from './outputResult.module.css';

interface OutputResultProps {}

const OutputResult: FC<OutputResultProps> = () => {
  return (
    <section>
      <h1>Result</h1>
      <section className={styles.resultSection}>
        <section>
          <h3>LCOH</h3>
          <p>244.8979591836735</p>
        </section>
        <section>
          <h3>LCOH</h3>
          <p>244.8979591836735</p>
        </section>
        <section>
          <h3>LCOH</h3>
          <p>244.8979591836735</p>
        </section>
      </section>
    </section>
  );
};

export default OutputResult;

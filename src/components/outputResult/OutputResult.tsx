import React, { FC } from "react";
import styles from "./outputResult.module.css";
import Result from "../result/Result";
import { RingLoader } from "react-spinners";

const OutputResult = ({ result, isLoading }: OutputResultProps) => {
  return (
    <section>
      <h1>Result</h1>
      {isLoading ? (
        <RingLoader size={120} color={"#123abc"} loading={isLoading} />
      ) : (
        <section className={styles.resultSection}>
          <Result title="LCOH" result={result.lcoh} />
          <Result
            title="Instalation Cost Proportion"
            result={result.instalationCostProportion}
          />
          <Result
            title="Hardware Cost Proportion"
            result={result.hardwareCostProportion}
          />
        </section>
      )}
    </section>
  );
};

export default OutputResult;

import React, { FC } from 'react';
//import styles from './result.module.css';

interface ResultProps {
  title: string;
  result: number | null;
}

const Result: FC<ResultProps> = ({ title, result }) => {
  return (
    <section>
      <h3>{title}</h3>
      <p>{result}</p>
    </section>
  );
};

export default Result;

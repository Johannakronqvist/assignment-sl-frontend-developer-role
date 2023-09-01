import React, { useState } from 'react';
import Head from 'next/head';
import Form from '../components/form/Form';
import OutputResult from '../components/outputResult/OutputResult';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

interface ResultParameters {
  lcoh: number | null;
  instalationCostProportion: number | null;
  hardwareCostProportion: number | null;
}

export default function Home() {
  const [result, setResult] = useState<ResultParameters>({
    lcoh: 0,
    instalationCostProportion: 0,
    hardwareCostProportion: 0,
  });

  return (
    <>
      <Head>
        <title>assignment-sl</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Form setResult={setResult} />
        <OutputResult result={result} />
      </main>
    </>
  );
}

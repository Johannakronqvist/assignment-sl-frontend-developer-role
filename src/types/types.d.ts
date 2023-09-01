interface ResultParameters {
  lcoh: number | null;
  instalationCostProportion: number | null;
  hardwareCostProportion: number | null;
}

interface ResponseParameters {
  capex: {
    installation: number | null;
    hardware: number | null;
  };
  h2Production: number[];
}

interface ResultParameters {
  lcoh: number | null;
  instalationCostProportion: number | null;
  hardwareCostProportion: number | null;
}

interface OutputResultProps {
  result: ResultParameters;
  isLoading: boolean;
}

interface InputProps {
  name: string;
  type: string;
  min: number;
  max?: number;
  step: number;
  value: number | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface ResultProps {
  title: string;
  result: number | null;
}

interface ValidationParameters {
  sizeMw: number | null;
  hardwareCostPerMw: number | null;
  installationCostPerMw: number | null;
  energyInput: number | null;
  SEC: number | null;
  degradationPerYear: number | null;
  years: number | null;
}

export type ValidationErrors = {
  [K in keyof ValidationParameters]?: string;
};

export const validateParameters = (
  name: keyof ValidationParameters,
  value: number | null
): string | null => {
  let error: string | null = null;

  if (value === null) {
    return null;
  }

  if (isNaN(value)) {
    return `The field ${name} should be a number`;
  }

  switch (name) {
    case "degradationPerYear":
      if (value < 0 || value > 1) {
        error = "Degradation per year must be between 0 and 1";
      }
      break;
    default:
      if (value < 0) {
        error = `${name} must be greater than or equal to 0`;
      }
      break;
  }

  return error;
};

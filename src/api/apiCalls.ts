export const fetchCapexData = async (params: {
  sizeMw: number | null;
  hardwareCostPerMw: number | null;
  installationCostPerMw: number | null;
}) => {
  const response = await fetch("/api/proxy?endpoint=capex", {
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching capex data.");
  }

  return await response.json();
};

export const fetchH2ProductionData = async (params: {
  energyInput: number | null;
  SEC: number | null;
  degradationPerYear: number | null;
  years: number | null;
}) => {
  const response = await fetch("/api/proxy?endpoint=h2production", {
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching h2 production data.");
  }

  return await response.json();
};

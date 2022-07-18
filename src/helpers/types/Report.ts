export type Report = {
  title: string;
  lines: ReportLine[];
};

type ReportLine = {
  subitems: string[];
  name: string;
  type: "Error" | "Improvement" | "Missing";
  severity: Severity;
  description: string;
  recommandation: string;
  backendUrl: string;
  frontendUrl: string;
};

export enum Severity {
  VeryLow = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  VeryHigh = 4,
}

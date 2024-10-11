export interface Node {
  id: number;
  label: string;
}

export interface Edge {
  from: number;
  to: number;
  risk: number;
  label?: string;
}

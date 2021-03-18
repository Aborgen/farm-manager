import { Establishment } from 'context/FarmSupply/Establishments';

export interface Farmhand {
  id: string,
  specialty: Specialty,
  assignment: Establishment | null,
};

export interface FarmhandByIdentifier {
  [id: string]: Farmhand
};

export type Demographics = Record<Specialty, {
  count: number,
  farmhands: FarmhandByIdentifier,
}>;

export enum Specialty {
  None = "farmhand",
};

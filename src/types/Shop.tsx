import { Crop } from 'types/Crops';

export type Cart = Record<Crop, {
  quantity: number,
  total: number,
}>;

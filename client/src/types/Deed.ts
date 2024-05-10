import { Entity } from './Entity';

export type Deed = Entity & {
  title: string;
  description: string;
  points: number;
  completed: boolean;
};

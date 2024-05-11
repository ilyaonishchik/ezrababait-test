import { Deed } from './Deed';

export type UpdateDeedDto = Partial<Pick<Deed, 'title' | 'description' | 'points' | 'completed'>>;

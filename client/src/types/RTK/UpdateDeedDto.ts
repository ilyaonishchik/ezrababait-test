import { Deed } from '../entities/Deed';

export type UpdateDeedDto = Partial<Pick<Deed, 'title' | 'description' | 'points' | 'completed'>>;

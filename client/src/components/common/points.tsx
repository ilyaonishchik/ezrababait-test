import { IconCarambola } from '@tabler/icons-react';
import { Group } from '../ui';

type PointsProps = {
  value: number;
};

export default function Points({ value }: PointsProps) {
  return (
    <Group>
      <IconCarambola fill='#fde047' />
      <span className='font-bold'>{value}</span>
    </Group>
  );
}

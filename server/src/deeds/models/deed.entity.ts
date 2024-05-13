import { User } from 'src/users/models/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('deeds')
export class Deed {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.deeds, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  points: number;

  @Column({ default: false })
  completed: boolean;
}

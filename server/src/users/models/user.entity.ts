import { Deed } from 'src/deeds/models/deed.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ unique: true })
  verificationLink: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({ name: 'followings', joinColumn: { name: 'followerId' }, inverseJoinColumn: { name: 'followingId' } })
  followings: User[];

  @ManyToMany(() => User, (user) => user.followings)
  followers: User[];

  @OneToMany(() => Deed, (deed) => deed.user, { onDelete: 'CASCADE' })
  deeds: Deed[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => User, (user) => user.followers, { cascade: true })
  @JoinTable({ name: 'followings', joinColumn: { name: 'followerId' }, inverseJoinColumn: { name: 'followingId' } })
  followings: User[];

  @ManyToMany(() => User, (user) => user.followings)
  followers: User[];
}

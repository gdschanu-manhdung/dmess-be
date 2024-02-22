import { Gender } from 'src/utils/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avtlink: string;

    @Column()
    phone: string;

    @Column({ type: 'timestamp' })
    dob: Date;

    @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
    gender: Gender;
}

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Member } from './Member';
import { Reaction } from './Reaction';

@Entity({ name: 'messages' })
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Member, (member) => member.messages)
    member: Member;

    @Column()
    content: string;

    @Column({ type: 'timestamp' })
    time: Date;

    @OneToMany(() => Reaction, (reaction) => reaction.message)
    reactions: Reaction[];
}

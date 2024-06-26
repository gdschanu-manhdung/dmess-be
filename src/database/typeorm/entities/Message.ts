import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { Conversation } from './Conversation'
import { Member } from './Member'
import { Reaction } from './Reaction'

@Entity({ name: 'messages' })
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Member, (member) => member.messages)
    member: Member

    @Column()
    content: string

    @Column({ type: 'date' })
    time: string

    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation: Conversation

    @OneToMany(() => Reaction, (reaction) => reaction.message)
    reactions: Reaction[]
}

import { ConversationType } from 'src/utils/constants'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { Member } from './Member'
import { Message } from './Message'
import { User } from './User'

@Entity({ name: 'conversations' })
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum: ConversationType,
        default: ConversationType.PRIVATE,
    })
    type: ConversationType

    @ManyToOne(() => User, (user) => user.conversations)
    host: User

    @OneToMany(() => Member, (member) => member.conversation)
    members: Member[]

    @OneToMany(() => Message, (message) => message.conversation)
    messages: Message[]

    @Column()
    theme: string
}

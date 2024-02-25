import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm"
import { Conversation } from "./conversation"
import { Message } from "./message"
import { User } from "./user"

@Entity({ name: "members" })
export class Member {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nickname: string

    @ManyToOne(() => Conversation, (conversation) => conversation.members)
    conversation: Conversation

    @ManyToOne(() => User, (user) => user.members)
    user: User

    @OneToMany(() => Message, (message) => message.member)
    messages: Message[]
}

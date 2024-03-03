import { Gender } from 'src/utils/constants'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Conversation } from './conversation'
import { Friend } from './friend'
import { Member } from './member'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    avatarLink: string

    @Column()
    phone: string

    @Column({ type: 'date' })
    dob: string

    @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
    gender: Gender

    @OneToMany(() => Conversation, (conversation) => conversation.host)
    conversations: Conversation[]

    @OneToMany(() => Member, (member) => member.user)
    members: Member[]

    @OneToMany(() => Friend, (friend) => friend.fromUser)
    fromFriends: Friend

    @OneToMany(() => Friend, (friend) => friend.toUser)
    toFriends: Friend
}

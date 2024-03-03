import { ReactionType } from 'src/utils/constants'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Member } from './member'
import { Message } from './message'

@Entity({ name: 'reactions' })
export class Reaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Message, (message) => message.reactions)
    message: Message

    @Column({ type: 'enum', enum: ReactionType, default: ReactionType.OTHER })
    reactionType: ReactionType

    @ManyToOne(() => Member, (member) => member.reactions)
    member: Member
}

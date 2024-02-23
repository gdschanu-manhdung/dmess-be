import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({ name: "friends" })
export class Friend {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.fromFriends)
    fromUser: User

    @ManyToOne(() => User, (user) => user.toFriends)
    toUser: User
}

import { FriendsStatus } from "src/utils/constants"
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity({ name: "friends" })
export class Friend {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: FriendsStatus, default: FriendsStatus.NONE })
    status: FriendsStatus

    @ManyToOne(() => User, (user) => user.fromFriends)
    fromUser: User

    @ManyToOne(() => User, (user) => user.toFriends)
    toUser: User
}

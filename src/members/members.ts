import { Member } from "src/database/typeorm/entities/member"
import { MemberForConversation } from "src/utils/types"

export interface IMembersService {
    createMembers(
        memberForConversation: MemberForConversation,
    ): Promise<Member[]>
}

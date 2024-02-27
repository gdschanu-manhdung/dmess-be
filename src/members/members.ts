import { Member } from "src/database/typeorm/entities/member"
import { MembersForConversation, MemberToConversation } from "src/utils/types"

export interface IMembersService {
    createMembers(
        membersForConversation: MembersForConversation,
    ): Promise<Member[]>
    addMember(memberToConversation: MemberToConversation): Promise<Member>
}

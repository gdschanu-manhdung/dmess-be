import { Member } from 'src/database/typeorm/entities/Member'
import { MembersForConversation, MemberToConversation } from 'src/utils/types'

export interface IMembersService {
    createMembers(
        membersForConversation: MembersForConversation,
    ): Promise<Member[]>
    addMember(memberToConversation: MemberToConversation): Promise<Member>
    removeMember(memberToConversation: MemberToConversation): Promise<void>
    findMemberById(memberId: number): Promise<Member>
}

import { Member } from "src/database/typeorm/entities/member"
import { ConversationDetails } from "src/utils/types"

export interface IMembersService {
    createMembers(conversationDetails: ConversationDetails): Promise<Member[]>
}

import { Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ConversationsService } from "src/conversations/conversations.service"
import { Member } from "src/database/typeorm/entities/member"
import { UsersService } from "src/users/users.service"
import { Services } from "src/utils/constants"
import { MemberForConversation } from "src/utils/types"
import { Repository } from "typeorm"
import { IMembersService } from "./members"

export class MembersService implements IMembersService {
    constructor(
        @Inject(Services.CONVERSATIONS)
        private readonly conversationsService: ConversationsService,
        @Inject(Services.USERS) private usersService: UsersService,
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
    ) {}

    async createMembers(memberForConversation: MemberForConversation) {
        try {
            const conversation =
                await this.conversationsService.findConversationById(
                    memberForConversation.conversationId,
                )
            const newMembersPromises = memberForConversation.memberIds.map(
                async (memberId) => {
                    const user = await this.usersService.findUserById(memberId)
                    const params = {
                        nickname: user.name,
                        conversation,
                        user,
                        messages: [],
                    }
                    return this.memberRepository.create(params)
                },
            )
            const newMembers = await Promise.all(newMembersPromises)
            return await this.memberRepository.save(newMembers)
        } catch (error) {
            console.error(error)
        }
    }
}

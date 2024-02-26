import { InjectRepository } from "@nestjs/typeorm"
import { Conversation } from "src/database/typeorm/entities/Conversation"
import { ConversationDetails } from "src/utils/types"
import { Repository } from "typeorm"
import { IConversationsService } from "./conversations"
import { Inject } from "@nestjs/common"
import { ConversationType, Services } from "src/utils/constants"
import { UsersService } from "src/users/users.service"

export class ConversationsService implements IConversationsService {
    constructor(
        @Inject(Services.USERS) private readonly usersService: UsersService,
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
    ) {}

    async createGroupConversation(conversationDetails: ConversationDetails) {
        try {
            const userNames = await Promise.all(
                conversationDetails.memberIds.map(async (memberId) => {
                    const user = await this.usersService.findUserById(memberId)
                    return user.name
                }),
            )
            const name = userNames.join(", ")

            const host = await this.usersService.findUserById(
                conversationDetails.hostId,
            )

            const params = {
                ...conversationDetails,
                name,
                type: ConversationType.GROUP,
                theme: "",
                host,
            }
            const newConversation = this.conversationRepository.create(params)
            return await this.conversationRepository.save(newConversation)
        } catch (error) {
            console.error(error)
        }
    }
}

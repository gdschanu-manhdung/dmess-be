import { IReactionsService } from './reactions'
import { Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Reaction } from 'src/database/typeorm/entities/reaction'
import { Repository } from 'typeorm'
import { Services } from 'src/utils/constants'
import { MessagesService } from 'src/messages/messages.service'
import { SendReactionDto } from './dto/sendReaction.dto'
import { ReactionDetails } from 'src/utils/types'
import { MembersService } from 'src/members/members.service'
import { RemoveReactionDto } from './dto/RemoveReaction.dto'

export class ReactionsService implements IReactionsService {
    constructor(
        @InjectRepository(Reaction)
        private readonly reactionRepository: Repository<Reaction>,
        @Inject(Services.MESSAGES)
        private readonly messagesService: MessagesService,
        @Inject(Services.MEMBERS)
        private readonly membersService: MembersService,
    ) {}

    async sendReaction(sendReactionDto: SendReactionDto) {
        try {
            const message = await this.messagesService.findMessageId(
                sendReactionDto.messageId,
            )
            const member = await this.membersService.findMemberById(
                sendReactionDto.memberId,
            )
            const reactionSaved = await this.reactionRepository.findOne({
                where: {
                    message,
                    member,
                },
            })
            if (!reactionSaved) {
                const reactionDetails = {
                    message,
                    member,
                    reactionType: sendReactionDto.reactionType,
                } as ReactionDetails

                const reaction = this.reactionRepository.create(reactionDetails)
                return await this.reactionRepository.save(reaction)
            }
            reactionSaved.reactionType = sendReactionDto.reactionType
            return await this.reactionRepository.save(reactionSaved)
        } catch (error) {
            console.error(error)
        }
    }

    async removeReaction(removeReactionDto: RemoveReactionDto) {
        try {
            const message = await this.messagesService.findMessageId(
                removeReactionDto.messageId,
            )
            const member = await this.membersService.findMemberById(
                removeReactionDto.memberId,
            )
            const reactionSaved = await this.reactionRepository.findOne({
                where: {
                    message,
                    member,
                },
            })
            await this.reactionRepository.remove(reactionSaved)
        } catch (error) {
            console.error(error)
        }
    }
}

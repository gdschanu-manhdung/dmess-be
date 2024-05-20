import { forwardRef, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConversationsService } from 'src/conversations/conversations.service'
import { Member } from 'src/database/typeorm/entities/Member'
import { UsersService } from 'src/users/users.service'
import { Services } from 'src/utils/constants'
import {
    FindConversationQuery,
    MembersForConversation,
    MemberToConversation,
} from 'src/utils/types'
import { Repository } from 'typeorm'
import { IMembersService } from './members'

export class MembersService implements IMembersService {
    constructor(
        @Inject(Services.CONVERSATIONS)
        private readonly conversationsService: ConversationsService,
        @Inject(forwardRef(() => Services.USERS))
        private usersService: UsersService,
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
    ) {}

    async createMembers(membersForConversation: MembersForConversation) {
        try {
            const conversationDetails = {
                conversationId: membersForConversation.conversationId,
            } as FindConversationQuery
            const conversation =
                await this.conversationsService.findConversationById(
                    conversationDetails,
                )
            const newMembersPromises = membersForConversation.memberIds.map(
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

    async addMember(memberToConversation: MemberToConversation) {
        try {
            const conversationDetails = {
                conversationId: memberToConversation.conversationId,
            } as FindConversationQuery
            const conversation =
                await this.conversationsService.findConversationById(
                    conversationDetails,
                )
            const user = await this.usersService.findUserById(
                memberToConversation.memberId,
            )
            const params = {
                nickname: user.name,
                conversation,
                user,
                messages: [],
            }
            const newMember = this.memberRepository.create(params)
            return await this.memberRepository.save(newMember)
        } catch (error) {
            console.error(error)
        }
    }

    async removeMember(memberToConversation: MemberToConversation) {
        try {
            const user = await this.usersService.findUserById(
                memberToConversation.memberId,
            )
            const conversationDetails = {
                conversationId: memberToConversation.conversationId,
            } as FindConversationQuery
            const conversation =
                await this.conversationsService.findConversationById(
                    conversationDetails,
                )

            const member = await this.memberRepository.findOne({
                where: {
                    user,
                    conversation,
                },
            })

            member && (await this.memberRepository.remove(member))
        } catch (error) {
            console.error(error)
        }
    }

    async findMemberById(memberId: number): Promise<Member> {
        try {
            const member = await this.memberRepository.findOne({
                where: { id: memberId },
            })

            return member
        } catch (error) {
            console.error(error)
        }
    }
}

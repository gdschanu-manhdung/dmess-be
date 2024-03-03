import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Conversation } from 'src/database/typeorm/entities/Conversation'
import { UsersModule } from 'src/users/users.module'
import { Services } from 'src/utils/constants'
import { ConversationsController } from './conversations.controller'
import { ConversationsService } from './conversations.service'

@Module({
    imports: [TypeOrmModule.forFeature([Conversation]), UsersModule],
    controllers: [ConversationsController],
    providers: [
        {
            provide: Services.CONVERSATIONS,
            useClass: ConversationsService,
        },
    ],
    exports: [
        {
            provide: Services.CONVERSATIONS,
            useClass: ConversationsService,
        },
    ],
})
export class ConversationsModule {}

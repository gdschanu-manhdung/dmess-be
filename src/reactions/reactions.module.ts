import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reaction } from 'src/database/typeorm/entities/reaction'
import { MembersModule } from 'src/members/members.module'
import { MessagesModule } from 'src/messages/messages.module'
import { Services } from 'src/utils/constants'
import { ReactionsController } from './reactions.controller'
import { ReactionsService } from './reactions.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Reaction]),
        MessagesModule,
        MembersModule,
    ],
    controllers: [ReactionsController],
    providers: [{ provide: Services.REACTIONS, useClass: ReactionsService }],
    exports: [{ provide: Services.REACTIONS, useClass: ReactionsService }],
})
export class ReactionsModule {}

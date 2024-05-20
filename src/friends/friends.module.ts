import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Friend } from 'src/database/typeorm/entities/Friend'
import { UsersModule } from 'src/users/users.module'
import { Services } from 'src/utils/constants'
import { FriendsController } from './friends.controller'
import { FriendsService } from './friends.service'

@Module({
    imports: [TypeOrmModule.forFeature([Friend]), UsersModule],
    controllers: [FriendsController],
    providers: [
        {
            provide: Services.FRIENDS,
            useClass: FriendsService,
        },
    ],
    exports: [
        {
            provide: Services.FRIENDS,
            useClass: FriendsService,
        },
    ],
})
export class FriendsModule {}

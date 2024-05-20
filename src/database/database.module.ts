import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Conversation } from './typeorm/entities/Conversation'
import { Friend } from './typeorm/entities/Friend'
import { Member } from './typeorm/entities/Member'
import { Message } from './typeorm/entities/Message'
import { Reaction } from './typeorm/entities/Reaction'
import { User } from './typeorm/entities/User'

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                // host: configService.get("PGHOST"),
                // port: configService.get("PGPORT"),
                // username: configService.get("PGUSER"),
                // password: configService.get("PGPASSWORD"),
                // database: configService.get("PGDATABASE"),
                entities: [
                    Conversation,
                    Friend,
                    Member,
                    Message,
                    Reaction,
                    User,
                ],
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule {}

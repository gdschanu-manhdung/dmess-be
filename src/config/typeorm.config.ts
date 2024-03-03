import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from 'dotenv'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

config()

const configService = new ConfigService()

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // host: configService.getOrThrow("PGHOST"),
    // port: configService.getOrThrow("PGPORT"),
    // username: configService.getOrThrow("PGUSER"),
    // password: configService.getOrThrow("PGPASSWORD"),
    // database: configService.getOrThrow("PGDATABASE"),
    // migrations: ["migrations/**"],
    synchronize: true,
    // logging: true,
    entities: [join(__dirname, '../database/typeorm/entities/*.{ts,js}')],
    ssl: true,
    // extra: {
    //     ssl: {
    //         rejectUnauthorized: false,
    //         ca: readFileSync(
    //             join(__dirname, "path_to_your_ca_certificate"),
    //         ).toString(),
    //     },
    // },
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource

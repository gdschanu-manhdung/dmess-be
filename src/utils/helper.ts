import * as bcrypt from 'bcrypt'
import { Like } from 'typeorm'
import { FindUserQuery, FriendsRequestQuery } from './types'

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword)
}

export function filterFindUserQuery(findUserQuery: FindUserQuery) {
    return Object.entries(findUserQuery).reduce((acc, [key, value]) => {
        if (value) {
            acc.push({ [key]: Like(`%${value}%`) })
        }
        return acc
    }, [])
}

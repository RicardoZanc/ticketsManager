import bcrypt from 'bcrypt'

const saltRounds: number = Number(process.env.ROUNDS_FOR_SALT_GENERATION)

if(!saltRounds){
    throw new Error('ROUNDS_FOR_SALT_GENERATION must be declared in environment')
}

const encrypt = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds)
    const passwordHash = bcrypt.hash(password, salt)
    return passwordHash
}

const compare = async (plainPassword: string, storedPassword: string): Promise<Boolean> => {
    const result = await bcrypt.compare(plainPassword, storedPassword)
    return result;
}

export const passwordHelper = {
    encrypt,
    compare
}
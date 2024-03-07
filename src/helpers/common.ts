import bcryptjs from 'bcryptjs';
import * as nanoid from 'nanoid';

const generateHashForPassword = (password: string) => bcryptjs.hashSync(password, 12);

const checkHash = (input: string, hash: string) => bcryptjs.compareSync(input, hash);

const generateRandomText = () => nanoid.customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12)();

export { generateHashForPassword, checkHash, generateRandomText };

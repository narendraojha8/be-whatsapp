
import {sign} from '../utils/token.util.js';
export const generateToken = async(payload,secret,expiresIn)=>{
  const token = await sign(payload,secret,expiresIn)
  return token;
}
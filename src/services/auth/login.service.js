import jwt from 'jsonwebtoken'; 

import { User } from '../../models/User.model.js';
import { isNotFound } from '../../utils/validations/Validate.js';
import { comparePassword } from './hash.service.js';
import { AuthError } from '../../errors/TypeError.js';
import { isNotMatchedPassword } from '../../utils/validations/password.js';
import { normalizeUserPrivateData } from '../../utils/normalize/user.js';

const secretKey = process.env.SECRET_KEY



export const loginService = async({ email, password }) => {

    try { 
        const user = await User.findOne({ 
            where: { email } 

        });
        isNotFound(user); 
        const passwordMatch = await comparePassword(password, user.password);
        isNotMatchedPassword(passwordMatch);
        

        
        const privateUser = normalizeUserPrivateData(user);
        const token = jwt.sign( 
            { id: user.id, email: user.email, admin:user.admin}, 
            secretKey,
            { expiresIn: '1h' } 
        );

        return {
            token,
            user: privateUser 
        };
    } catch (error) {
        throw new AuthError('Login no autorizado', 500, error); 
    }
};

import { AuthError, ValidationError } from '../../errors/TypeError.js';
import { comparePassword } from '../../services/auth/hash.service.js';

export const validatePassword = (password) => {
    if(password.length < 8) {
        throw new ValidationError('La contraseña debe contener al menos 8 caracteres');
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if(!passRegex.test(password)) {
        throw new ValidationError('La contraseña debe incluir al menos una mayúscula, una minúscula, un dígito y un carácter especial');
    }

    const digitChain = password.replace(/\D+/g, '');

    for(let i = 0; i < digitChain.length - 2; i++) {
        const digitOne = parseInt(digitChain[i], 10);
        const digitTwo = parseInt(digitChain[i + 1], 10);
        const digitThree = parseInt(digitChain[i + 2], 10);

        if(digitOne === digitTwo && digitTwo === digitThree) {
            throw new ValidationError('La contraseña no puede tener 3 dígitos idénticos consecutivos');
        }

        if((digitOne + 1 === digitTwo) && (digitTwo + 1 === digitThree)) {
            throw new ValidationError('La contraseña no puede tener 3 dígitos consecutivos ascendentes');
        }
    }

    const lettersChain = password.replace(/[^A-Za-z]+/g, '');
    for (let i = 0; i < lettersChain.length - 2; i++) {
        const letterOne = lettersChain.charCodeAt(i);
        const letterTwo = lettersChain.charCodeAt(i + 1);
        const letterThree = lettersChain.charCodeAt(i + 2);

        if((letterOne + 1 === letterTwo) && (letterTwo + 1 === letterThree)) {
            throw new ValidationError('La contraseña no puede tener 3 letras en secuencia ascendente consecutiva');
        }
    }

    return true;
};


export const isNotMatchedPassword = (matchResult) => {
    if(!matchResult) throw new AuthError('Credenciales inválidas');
};


export const isEqualPassword = async(newPassword, oldPassword) => {
    try {
        const matchPassword = await comparePassword(newPassword, oldPassword);
        console.log(matchPassword);
        console.log('New Password: ', newPassword);
        
        if(matchPassword) throw new AuthError(
            'La nueva contraseña no debe coincidir con la anterior',
            500,
            'La contraseña que estas entregando es identica a la contraseña que intentas restablecer'
        );
    } catch (error) {
        throw new AuthError('Error al comparar las contraseñas', 500, error);
    }
}
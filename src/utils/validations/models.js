import { ValidationError } from 'sequelize';


export const ensureEmailNotTaken = async(Model, email) => {
    const existingUser = await Model.findOne({ where: { email } });
    if (existingUser) throw new ValidationError('Ya existe un usuario con este correo');
};


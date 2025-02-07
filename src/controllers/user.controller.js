import { User } from '../models/User.model.js'
import { Bootcamp } from '../models/Bootcamp.model.js'
import { NotFoundError, ValidationError } from '../errors/TypeError.js';
import { isEmptyResponseData } from "../utils/validations/Validate.js";



export const getAllUsersIncludeDeleted = async(req, res, next) => {
    try {
        const allUsers = await User.findAll({ paranoid: false });

        isEmptyResponseData(allUsers)

        res.status(200).json({
            message: 'Todos los usuarios encontrados con éxito',
            status: 200,
            data: allUsers
        })
    } catch (error) {
        next(error)
    }
}



export const getAllActiveUsers = async(req, res, next) => {
    try {
        const allActiveUsers = await User.findAll({
            attributes: {
                exclude: ['password','createdAt', 'updatedAt', 'deletedAt']
            }
        });

        isEmptyResponseData(allActiveUsers);
        
        res.status(200).json({
            message: "Usuarios encontrados con éxito",
            status: 200,
            data: allActiveUsers,
        });
    } catch (error) {
        next(error)
    }
}


export const getUserById = async(req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = await User.findByPk( userId,{
            attributes: {
                exclude: ['password','createdAt', 'updatedAt', 'deletedAt']
            }
        });

        isEmptyResponseData(userData);
        
        res.status(200).json({
            message: "Usuario encontrado con éxito",
            status: 200,
            data: userData,
        });
    } catch (error) {
        next(error)
    }
}


export const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Verificar si el usuario autenticado está intentando actualizar sus propios datos
        if (req.user.id !== id) {
            return res.status(401).json({error: 'No puedes modificar los datos de otro usuario,que no seas tú'})
        }
        
        
        const updateData = req.body;


        const allowedFields = ["firstName", "lastName", "email"];
        
        
        for (const key in updateData) {
            if (!allowedFields.includes(key)) {
                throw new Error(`El campo ${key} no está permitido para la actualización.`);
            }
        }

        
        const userBeforeUpdate = await User.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        
        const [updateRows, [updateUser]] = await User.update(updateData, {
            where: { id },
            returning: true,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
    
        if (updateRows === 0) {
            throw new NotFoundError(`No se encontró al usuario con el ID: ${id}`);
        }

        
        const modifiedFields = {};
        for (const key in updateData) {
            if (userBeforeUpdate[key] !== updateData[key]) {
                modifiedFields[key] = {
                    before: userBeforeUpdate[key],
                    after: updateData[key]
                };
            }
        }

        res.status(200).json({
            message: "Usuario actualizado con éxito",
            status: 200,
            newData: updateUser,
            modifiedFields 
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};



export const deletUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const user = await User.findByPk(id);

        isEmptyResponseData(user);

        const userData = user.toJSON(); 
        await user.destroy();

        res.status(200).json({
            message: 'Usuario Eliminado con éxito',
            status: 200,
            deleteUser: userData
        })
    } catch (error) {
        next(error)
    }
}

export const restoredUser =  async(req, res, next) => {
    try {
        const { id } = req.params;

        const restoredUser = await User.findByPk(id, { paranoid: false })

        isEmptyResponseData(restoredUser);
        if(restoredUser.deletedAt === null) throw new ValidationError('El usuario no ha sido eliminado');

    
        await restoredUser.restore();

        res.status(200).json({
            message: "Usuario Restaurado con éxito",
            status: 200,
            data: restoredUser
        });
    } catch (error) {
        next(error)
    }
}
export const permaDeletUser = async (req, res) => {
    try {
        const { id } = req.params
        
        const user = await User.findByPk(id);

        if(!user) {
            throw new NotFoundError('No encontramos al usuario que deseas eliminar');
        }
        const userData = user.toJSON();
        await user.destroy( { force: true } );

        res.status(200).json({
            message: 'Usuario Eliminado con éxito',
            status: 200,
            deleteUser: userData 
        })
    } catch (error) {
        next(error)
    }
}


export const findUserById = async (req, res, next) => {
    const { id } = req.params; 
    try {
        const user = await User.findOne({
            where: { id: id }, 
            attributes: ['id', 'firstName', 'lastName', 'email'], 
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamps', 
                    attributes: ['id', 'title', 'description'] 
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                status: 404
            });
        }

        res.status(200).json({
            message: 'Usuario y bootcamps obtenidos con éxito',
            status: 200,
            data: {
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                bootcamps: user.bootcamps 
            }
        });
    } catch (error) {
        next(error);
    }
};


export const findAll = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email','createdAt', 'updatedAt', 'deletedAt'], 
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamps', 
                    attributes: ['id', 'title', 'description','createdAt', 'updatedAt',] 
                }
            ]
        });

        res.status(200).json({
            message: 'Usuarios y bootcamps obtenidos con éxito',
            status: 200,
            data: users 
        });
    } catch (error) {
        next(error);
    }
};


export const findAllForNoAdmin = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt'] 
            },
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamps', 
                    attributes: {
                        exclude: ['createdAt', 'updatedAt','deletedAt'] 
                    }
                }
            ]
        });
        res.json(users); 
    } catch (error) {
        next(error); 
    }
};



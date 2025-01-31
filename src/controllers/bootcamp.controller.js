import{Bootcamp} from '../models/Bootcamp.model.js'
import { User } from '../models/User.model.js';
import { isEmptyResponseData } from '../utils/validations/Validate.js';




export const createBootcamp = async(req, res, next) => {
    try {

        const bootcamp = await Bootcamp.create(req.body);
        
        console.log(bootcamp)
        res.status(201).json({
            message: 'Bootcamp creado con éxito',
            status: 201,
            data: bootcamp
        })
    } catch (error) {
        next(error)
    }
}

    export const getAllBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.findAll({
            attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

        isEmptyResponseData(bootcamps);

        res.status(200).json({
        message: "Todos los Bootcamps encontrados con éxito",
        status: 200,
        data: bootcamps,
    });
    } catch (error) {
        next(error);
    }
    };

    export const findById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const bootcamp = await Bootcamp.findByPk(id, {
                attributes: { 
                exclude: ['createdAt', 'updatedAt']
            }
        });

        isEmptyResponseData(bootcamp);
        
        if (!bootcamp) {
            return res.status(404).json({ message: "Bootcamp no encontrado", status: 404 });
        } 

            res.status(200).json({
            message: "Bootcamp encontrado con éxito",
            status: 200,
            data: bootcamp,
        });
        } catch (error) {
            next(error);
        }
    };


    export const addUser = async (req, res, next) => {
        try {
            const { bootcamp_id, user_id } = req.body;
    
            
            const bootcamp = await Bootcamp.findByPk(bootcamp_id);
            if (!bootcamp) {
                return res.status(404).json({
                    message: 'Bootcamp no encontrado',
                    status: 404,
                });
            }
    
        
            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(404).json({
                    message: 'Usuario no encontrado',
                    status: 404,
                });
            }
            
            await bootcamp.addUser(user); 
    
            res.status(201).json({
                message: 'Usuario agregado al Bootcamp con éxito',
                status: 201,
                data: {
                    bootcamp_id,
                    bootcampTitle: bootcamp.title, 
                    user_id,
                    userfirstName: user.firstName, 
                },
            });
        } catch (error) {
            next(error);
        }
    };

    
    
    
    

export const getAllBootcampsWhithUsers= async (req, res, next) => {
    try {
        const bootcamps= await Bootcamp.findAll({
            include:[
                {
                    model:User,
                    as:'users',
                    attributes:['id','firstName','lastName']
                }
            ]
        })
        res.status(200).json({
            message: 'Bootcamps obtenidos con éxito',
            status: 200,
            data: bootcamps})
    } catch (error) {
        next(error)
    }
}



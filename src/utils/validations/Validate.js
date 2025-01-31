import {Op} from 'sequelize'
import { NotFoundError, ValidationError } from "../../errors/TypeError.js"

export const isArrayValidate = (data) => {
    if (!Array.isArray(data))
        throw new ValidationError(
        "La data ingresada no es un arreglo"
    );
}


export const isEmptyData = (data) => {
    if(!data || data.length === 0) {
        throw new ValidationError("la data ingresada esta vacía")
    }  
}

export const isEmptyResponseData = (data) => {
    if (!data || data.length === 0) {
      throw new NotFoundError("la data solicitada no fue encontrada");
    }  
}

/**
 * Valida que el regsitro que se esta evaluando no exista previamente para un campo dado que se espera que sea único. En caso de existir un valor dúplicado en un campo único, arrojara un error de validación
 * @param {Model} Modelo - Modelo constructor de los datos que se comúnica con la DB
 * @param {object} data - Datos a evaluar en la petición hacia la DB 
 * @param {Array<string>} fields - Campo que se desea evaluar en la clausula Where
 * @param {string} excluidID - ID en formato UUID que será excluida de esta validación. Por defecto es null 
 * @throws {ValidationError} - Si el valor existe arrojara un error de validación 
 */
export const validateExistData = async(Modelo, data, fields, excluidID = null ) => {
    const duplicatedFlieds = [];

    isArrayValidate(fields)
    
    for(const field of fields) {
        if(data[field]) {
            const whereClause = { [field]: data[field] }
            
            
            if(excluidID) {
                whereClause.id = { [Op.ne]: excluidID } 
            }
            
            const existData = await Modelo.findOne({ where: whereClause})
            if(existData) {
                duplicatedFlieds.push(field)
            }
        }
    }
    
    if(duplicatedFlieds.length > 0) {
        const fieldsString = duplicatedFlieds.map(field => `"${field}"`).join(', ');
        throw new ValidationError(`Los campos ${fieldsString} ya están en uso por otro registro en "${Modelo.name}"`)
    } 
}

export const emailContent=(to, subject, html) => {
    if (!to || !subject || !html) throw new ValidationError('Todos los campos del email deben ser cubiertos')
    return { to, subject, html}
}

const isEmpty = (data) => {
    if(!data)  return true;

    if(Array.isArray(data) && data.length === 0) return true;

    if(typeof data === 'object' && Object.keys(data).length === 0) return true;

    return false;
};


export const isNotFound = (data) => {
    if(isEmpty(data)) throw new NotFoundError('No pudimos encontrar la data solicitada');
};


import { DataBaseError } from "../../errors/TypeError.js";
import { setupUserBootcamp } from "../../models/associations.js/user_bootcamp.associations.js";

export const setupAssociation = () => {
    try {
        setupUserBootcamp();
        
    } catch (error) {
        console.error('Error al inicializar las relaciones', error);
        throw new DataBaseError('Error al iniicalizar las asociaciones', error)
    }
}

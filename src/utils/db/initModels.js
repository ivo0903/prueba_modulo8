
import { DataBaseError } from "../../errors/TypeError.js";
import { initUser } from "../../models/User.model.js";
import { initBootcamp } from "../../models/Bootcamp.model.js"


export const initModels = (config) => {
    try {
        initUser(config);
        initBootcamp(config);

    } catch (error) {
        console.error(error)
        throw new DataBaseError('Error al iniicializar los modelos')
    }
}

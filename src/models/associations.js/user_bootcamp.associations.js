import { User} from '../User.model.js';
import { Bootcamp } from '../Bootcamp.model.js';



export const setupUserBootcamp = () => {
    User.belongsToMany(Bootcamp, {
        through: 'user_bootcamp', 
        foreignKey: 'user_id', 
        otherKey: 'bootcamp_id',
        as: 'bootcamps'
    })

    Bootcamp.belongsToMany(User, {
        through: 'user_bootcamp',
        foreignKey: 'bootcamp_id',
        otherKey: 'user_id',
        as: 'users'
    })



}


import {Model, DataTypes} from 'sequelize'


export class User extends Model{}

export const initUser=(dbConfig)=>{
    User.init({
        id:{
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true, 
        },
        firstName:{
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                notEmpty: { msg: "El nombre no puede ser un campo vacío" },
                len: {
                    args: [2, 100],
                    msg: "El nombre no puede ser menor a 2 ni mayor a 100 carácteres",
                },
                is: { 
                    args: /^[a-zA-ZÁ-ÿñÑ\s]+$/,
                    msg: "El nombre solo puede contener letras del abecedario español",
                },
            },
        },
        lastName:{
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: { 
                notEmpty: { msg: "El apellido no puede ser un campo vacío" },
                len: {
                    args: [2, 100],
                    msg: "El apellido no puede ser menor a 2 ni mayor a 100 carácteres",
                },
                is: { 
                    args: /^[a-zA-ZÁ-ÿñÑ\s]+$/,
                    msg: "El apellido solo puede contener letras del abecedario español",
                },
            },

        },
        email:{
            type: DataTypes.STRING,
                    allowNull: false, 
                    unique: { msg: "El correo electrónico ingresado ya está en uso" },
                validate: {
                    notEmpty: { msg: "El correo no puede ser un campo vacío" },
                    isEmail: { msg: "El correo electrónico ingresado no es válido" },
            },
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,    
        }, 
        admin:{
        type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
        }
    },
    {
        sequelize: dbConfig,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: true 
        }
    );
}
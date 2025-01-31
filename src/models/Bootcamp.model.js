import {Model, DataTypes} from 'sequelize';

export class Bootcamp extends Model{};

export const initBootcamp=(dbConfig) =>{
    Bootcamp.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
            },//fin id
        title:{
            type: DataTypes.STRING,
            allownull: false,
            validate:{
                notEmpty: { msg:'El nombre del Bootcamp, no pede ser un campo vacío'},
                len:{
                    args: [2, 100],
                    msg: 'El nombre del Bootcamp, debe tener entre 2 y 100 caracteres'
                }
            }
        },
        cue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min:5,
                max:10,
            }
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
                notEmpty: { msg:'La descripción del Bootcamp, no puede ser un campo vacío'}
            } 
        }
        },
        {
            sequelize: dbConfig,
            modelName: 'Bootcamp',
            tableName: 'bootcamps',
            timestamps: true
        }
    )
}
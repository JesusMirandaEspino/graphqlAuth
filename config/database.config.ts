import mongoose from "mongoose";


export const connectDataBase = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log("conexion a db exitosa")
    }catch(error){
        console.log("error al conectarse a mongodb", error)
    }
};
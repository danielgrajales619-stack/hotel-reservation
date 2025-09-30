import mongoose from "mongoose";
const uri = process.env.MONGO_URI;

export const connectToDataBase = async () => {
    try {
        await mongoose.connect(uri)
        console.log('marca_de_verificacion_blanca: conectado a MongoDB con moongose')
    } catch (error) {
        console.error(':x: Error conectando a MongoDB', error)
        process.exit(1)
    }
}

export const closeConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log(':enchufe_eléctrico: Conexión con MongoDB cerrada')
    } catch(error) {
        console.error(':x: Error cerrando la conexión:', error)
    }
}
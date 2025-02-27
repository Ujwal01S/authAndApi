import mongoose from "mongoose";

export async function db() {
    try {
        const { connection } = await mongoose.connect(String(process.env.connectionStr))
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        return Promise.reject(error)
    }
};
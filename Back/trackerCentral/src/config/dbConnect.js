import mongoose from "mongoose";

mongoose.connect('mongodb+srv://root:root@cluster0.6m67u.mongodb.net/exceptionHandlerDB');

let db = mongoose.connection;

export default db;
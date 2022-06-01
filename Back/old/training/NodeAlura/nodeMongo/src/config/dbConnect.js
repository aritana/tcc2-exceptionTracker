import mongoose from "mongoose";

mongoose.connect('mongodb+srv://root:root@cluster0.nxrcb.mongodb.net/node-express-alura');

let db = mongoose.connection;

export default db;
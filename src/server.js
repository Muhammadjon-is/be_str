import  express from "express";
import cors from "cors"
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import booksRouter from "./Books/index.js";
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "./errorHandler.js";

const app = express()

const port = process.env.PORT || 3002
app.use(cors())
app.use(express.json())

app.use("/books", booksRouter)

// ErrorHandler

app.use(badRequestHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)


mongoose.connect(process.env.MONGOURL)

mongoose.connection.on("connected", () => {

 console.log("Mongo connected successfully");
app.listen(port, () => {
    console.table(listEndpoints(app))
    console.log("App running on ", port);
})
})



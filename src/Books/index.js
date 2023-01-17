import express from "express"
import BooksModel from "./dbmodel.js"
import createHttpError from 'http-errors'

const booksRouter = express.Router()

// !Post
booksRouter.post("/", async (req, res, next) => {
    res.send("dsdsds")
    try{
  const newBook = new BooksModel(req.body)
  const {_id} = await newBook.save()
  res.status(200).send({_id})
    }catch(error){
        next(error)
    }
})
booksRouter.get("/", async (req, res, next) => {
    try{
     const books = await BooksModel.find()
     res.send(books)
    }catch(error){
        next(error)
    }
})
booksRouter.get("/:booksId", async (req, res, next) => {
    try{
        const book = await BooksModel.findById(req.params.booksId)
        if (book) {
          res.send(book)
        } else {
          next(createHttpError(404, `User with id ${req.params.booksId} not found!`))
        }
    }catch(error){
        next(error)
    }
})
booksRouter.put("/:booksId", async (req, res, next) => {
    try{
        const updatedBooks = await BooksModel.findByIdAndUpdate(
            req.params.booksId,
            req.body,
            { new: true, runValidators: true }  
            )
      
          if(updatedBooks) {
            res.send(updatedBooks)
          } else {
            next(createHttpError(404, `User with id ${req.params.booksId} not found!`))
          }
    }catch(error){
        next(error)
    }
})


booksRouter.delete("/:booksId", async (req, res, next) => {
    try{
        const deletedBook = await BooksModel.findByIdAndDelete(req.params.booksId)

        if (deletedBook) {
          res.status(204).send()
        } else {
          next(createHttpError(404, `User with id ${req.params.booksId} not found!`))
        }
    }catch(error){
        next(error)
    }
})

export default booksRouter

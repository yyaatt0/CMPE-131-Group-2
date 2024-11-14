import express from 'express'
import mysql from 'mysql2'
import cors from "cors"

//USING EXPRESS
const app = express ()

//CREATE POOL FOR PERSISTENT CONNECTION CLOSE ON STANDBY
const db = mysql.createPool ({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "bankingapp"
})

//ALLOWS ANY USE OF JSON SENT BY POST METHOD
app.use(express.json())
//CORS REQUEST HANDLER
app.use(cors())

//CONNECTING TO BACKEND SERVER CHECK
app.get("/", (req, res) => {
    res.json("Hello this is the backend.")
})

app.get("/users", (req, res) => {
    const qry = "SELECT * FROM users"
    db.query(qry, (err, data) => {
        if(err) return res.json(err)
            return res.json(data)
    })
})

//USER LOGIN METHOD, REQUEST USERNAME & PASSWORD
//SEND DATA TO DATABASE THROUGH POST METHOD
app.post("/users", (req, res) => {

    //SQL SCRIPT TO SEND IF USER EXISTS
    const qry = "SELECT username FROM users WHERE username = ? AND pass = ? "

    //SEND FIRST REQ 'USERNAME' TO FIRST ? AND SECOND REQ 'PASS' TO SECOND ?
    db.query(qry, [req.body.username, req.body.pass], (err, data)=> {

        //DEFAULT
        if(err) return res.json(err);

        //QUERY RETURNS RESULT AS ARRAY OF FOUND ITEMS, IF ARRAY IS > 0 THEN USER + PASS IS INSIDE DB
        if(data.length > 0) {
            console.log("User has been found.")
            return res.json(true)
        }
        console.log("User has not been found.")
        return res.json(false)

    })
    console.log(res)

})

//PORT LISTENER
app.listen(3000, () => {
    console.log("Connected to backend!")
})
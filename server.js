const express = require('express')
const connectDB = require("./config/db_connection");
const cookieParser = require("cookie-parser");
const PORT = process.envPORT || 3000

const app = express()
connectDB();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", require("./Auth/route"))

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

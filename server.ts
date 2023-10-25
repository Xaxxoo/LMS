import { app } from "./app";
import connectDb from "./utils/db"
require("dotenv").config();


// CREATE SERVER
app.listen(process.env.PORT, () => {
    console.log(`server is listening on ${process.env.PORT}`);
    connectDb();
})
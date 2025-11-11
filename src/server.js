import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
require('dotenv').config();
import cors from "cors";

let app = express();
//app.use(cors());
//app.use(cors({ origin: true }));
//config 
app.use(cors({
  origin: ['http://localhost:3000'], // cho phép frontend của chị truy cập
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // bật nếu có dùng cookie / token
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})

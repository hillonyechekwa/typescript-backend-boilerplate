import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}))


app.use(compression()); //?what is compression for?
app.use(cookieParser()); //?what is cookie parser for?
app.use(bodyParser.json());



const server = http.createServer(app);


server.listen(5000, () => {
    console.log('Server running on http://localhost:5000/');
})


app.use("/", router());
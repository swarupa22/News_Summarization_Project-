const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectDB = require('./db/connectDB');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors());
dotenv.config();

const news_data = require("./news_data");
const newsModel = require('./db/NewsSchema');

const PORT = process.env.PORT || 3000

app.get('/', async (req, res)=>{
    // console.log(news_data);
    
    return res.json({msg:"hello from dumbo entry point!", data:news_data});
})
app.post('/news/post/:date', async (req, res)=>{
    try {
        const {date} = req.params;
        const {data} = req.body;
        const newNews = {
            date,data
        }
        const newsData = new newsModel(newNews);
        await newsData.save();
        return res.status(201).send(newsData)
        
    } catch (error) {
        return res.send(error)
    }
    
})

app.get('/news/get/:date', async (req, res)=>{
    try {
        const {date} = req.params;
        let foundDateNews = await newsModel.find({date:date});
        return res.send(foundDateNews)
    } catch (error) {
        return res.send(error)
    }
    
})


app.listen(PORT,async ()=>{
    let connect = await connectDB();
    console.log(connect);
    console.log(`Server is running on port ${PORT}`);
})
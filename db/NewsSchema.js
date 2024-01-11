const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    date: String,
    data: []
});

const newsModel = mongoose.model("NewsSchema", NewsSchema);

module.exports = newsModel;
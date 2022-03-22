const mongoose = require('mongoose');
const { mongoConfig } = require('./config/config')

exports.initiMonogoConn = async () => {
    try {
        mongoose.connect(mongoConfig.url, { 'useUnifiedTopology': true, 'useNewUrlParser': true })
        console.log(`Mongodb Connect Succesfully`);
    } catch (error) {
        console.log(error);
        console.log(`Rertying connect Mongodb`);
        setTimeout(data => {
            this.initiMonogoConn()
        }, 1000)
    }
}
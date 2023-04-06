const mongoose = require('mongoose');

module.exports = async () => {
    const connectionURI = process.env.MONGO_URI;
    await mongoose
            .connect(connectionURI,
                { useNewUrlParser: true })
            .then(() => console.log('MongoDB connected...'))
            .catch(err => console.log(err));
};
const mongoose = require('mongoose');

// load env vars 
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});

const doThings = async () =>{
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log("connected");
    });
    const db = mongoose.connection;
    const kittySchema = new mongoose.Schema({
        name: String,
        age: Number,
    });
    kittySchema.methods.speak = function() {
        console.log(this.name + " is speaking....");
    }
    const kittyModel = new mongoose.model('kitty',kittySchema);
    const k1 = new kittyModel({name: 'kitty ' + (Math.random() * 100 ).toFixed(0), age: 34, mew: 'yes'});
    console.log(k1);
    await k1.save();
    k1.speak();
    // deleteAll(kittyModel);
}

async function deleteAll(kittyModel) {
    await kittyModel.deleteMany();
    console.log('deleted');
}

doThings();

console.log("BINGO");
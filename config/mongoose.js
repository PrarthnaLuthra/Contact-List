// require library
const mongoose= require('mongoose')

// connect to db
mongoose.connect('mongodb://localhost/contact_list_db')

// acquire connection to check if it is successful
const db =mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running
db.once('open',function(){
    console.log('Successfully connected to the database');
})
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});


const port = 80;


//Define Mongoose Schemas
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For Serving Static Files
app.use(express.urlencoded())



// PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views',path.join(__dirname, 'views')) //set the view directory

//ENDPINTS
app.get('/',(req,res)=>{

    const params = {}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{

    const params = {}
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{

    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item bas not saved to the data base")
    })
    // res.status(200).render('contact.pug')
})


//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started succesfully on port ${port}`);
});
const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("assets"));
// middleware1
// app.use(function(req,res,next){
//   req.MyName="prarthna"
//   // console.log('middleware1 called')
//   console.log(req.mYName)
//   next()
// })
// middleware1
// app.use(function(req,res,next){
//   console.log('middleware2 called')
//   next()
// })
var contactList = [
  {
    name: "Vinnie",
    phone: "9873074422",
  },
  {
    name: "Papa",
    phone: "9811027794",
  },
  {
    name: "Mummy",
    phone: "7042863497",
  },
  {
    name: "Bhavya",
    phone: "9873478874",
  },
];
app.get("/", function (req, res) {
  // console.log(req.MyName)
  Contact.find({}, function (err, Contacts) {
    if (err) {
      console.log("ERROR IN FETCHING CONTACT FROM DB");
      return;
    }
    return res.render("home", {
      title: "My Contacts",
      contact_list: Contacts,
    });
  });
});

app.get("/delete-contact", function (req, res) {
  // get the id from query in the parameters
  let id = req.query.id;

  // find the contact in db using id and delete
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting an object from db");
      return;
    }
    return res.redirect("back");
  });

  // let contactIndex=contactList.findIndex(contact => contact.phone == phone);
  // if(contactIndex!= -1){
  //   contactList.splice(contactIndex,1);

  // }
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let's practice with ejs",
  });
});

app.post("/create-contact", function (req, res) {
  // return res.redirect('./practice')
  // contactList.push({
  //   name:req.body.name,
  //   phone:req.body.phone
  // })
  // contactList.push(req.body)
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact!");
        return;
      }
      console.log("*********", newContact);
      return res.redirect("back");
    }
  );
  // return res.redirect('/')//or back
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in the the server:", err);
  }
  console.log("Express Server is running on port ", port);
});

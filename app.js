const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const dbURL = 'mongodb://127.0.0.1:27017/wanderlust';
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
require('dotenv').config();

const dbUrl = process.env.ATLASDB_URL || 'mongodb://127.0.0.1:27017/wanderlust';

app.set('view engine', 'ejs');  
app.use(express.static(path.join(__dirname, 'public'))); 
app.engine('ejs', ejsMate);  
app.use(express.urlencoded({extended: true}));  
app.use(methodOverride('_method'));  
app.use(express.static(path.join(__dirname,"/public"))); 

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000* 60 * 60 * 24* 7,
        maxAge: 1000* 60 * 60 * 24* 7,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //authenticate()  Generates a function that is used in Passport's LocalStrategy
passport.serializeUser(User.serializeUser()); //serializeUser()  Generates a function that is used by Passport to serialize users into the session
passport.deserializeUser(User.deserializeUser()); //deserializeUser() Generates a function that is used by Passport to deserialize users into the session


const PORT = 3000;
main()
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    });


async function main() {
    await mongoose.connect(dbUrl);
    
}


app.use((req,res,next)=> { //middleware for flash
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})

app.get("/", (req, res) => {
  res.redirect("/listings");
});
//routes
app.use("/listings", listingRouter);    
app.use("/listings/:id/reviews/", reviewRouter);
app.use("/", userRouter);




app.use((err, req, res, next) => {
    let { statusCode = 500, message= "Something wrong happened"} = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).send(message);
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

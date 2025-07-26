const User = require("../models/user.js")

module.exports.renderSignupForm=(req,res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async(req,res)=> {
   try{
     let {username,email,password} = req.body;
    const newUser = User({email, username});
    const registeredUser = await User.register(newUser, password); // register in database
    req.login(registeredUser, (err)=> {
        if(err) {
            return next(err);   
        }
     req.flash("success", "Signed Up Successfully");
     res.redirect("/listings");
    })
    
   }
   catch(e) {               //username already in database
    req.flash("error", e.message);
    res.redirect("/signup")
   }
};

module.exports.renderLoginForm = (req,res)=> {
    res.render("users/login.ejs");  
}

module.exports.login = function(req, res) {
    req.flash("success", "Successful Login");
    const redirectUrl = res.locals.redirectUrl || '/listings'; // fallback redirect
    res.redirect(redirectUrl);
  }

module.exports.logout = (req,res,next)=> {
    req.logout((err)=> {
        if(err) {
            return next(err);
        }
        req.flash("success", "Logged Out");
        res.redirect("/listings");
    })
  }
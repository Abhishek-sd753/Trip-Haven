const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    let data = await Listing.find({});  
    res.render('listings/index.ejs', {listings: data});
}

module.exports.renderNewForm = async(req,res)=> {
    res.render('listings/new.ejs');
};

module.exports.createListing = async(req,res)=> {
    const listing = req.body.listing;
    const newList = Listing(listing);
    newList.owner = req.user._id;
   await newList.save();
   req.flash("success", "New Listing Created");
    res.redirect("/listings")
};

module.exports.editForm = async(req,res)=> {
     let {id} = req.params;
       const listing = await Listing.findById(id);
        if(!listing) {
            req.flash("error", "Listing Not Found");
            res.redirect("/listings");
        }
       res.render('listings/edit.ejs', {listing});
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: { path: 'author' }  // if you want reviewer usernames
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing Not Found");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing, currUser: req.user });
};

module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res)=> {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  };
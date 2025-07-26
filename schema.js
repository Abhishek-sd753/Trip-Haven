const Joi = require('joi');


module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
     image: Joi.alternatives().try(
      Joi.string(),
      Joi.allow('', null)
    ).optional()
  }).required()
});

//review Validation

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating : Joi.number().min(1).max(5).required,
        comment : Joi.string().required,
    }).required(),  
});
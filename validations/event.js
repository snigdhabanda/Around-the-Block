const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateEventInput(data) {
    let errors = {};
  
    data.name = validText(data.name) ? data.name : '';
    data.description = validText(data.description) ? data.description : '';
  
    
    if (Validator.isEmpty(data.name)) {
      errors.name = 'Name is required';
    }
  
    if (Validator.isEmpty(data.description)) {
      errors.description = 'Description is required';
    }

    if (!Validator.isLength(data.description, { min: 15 })) {
        errors.description = 'Description must be longer';
    }

    // if (!Validator.isFloat(data.lat)) {
    //     errors.description = 'Coordinates are not valid';
    // }
  
    // if (!Validator.isFloat(data.long)) {
    //     errors.description = 'Coordinates are not valid';
    // }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };

module.exports = function validateEventUpdate(data) {
    let errors = {};
    if (data.name){
        data.name = validText(data.name) ? data.name : '';
        if (Validator.isEmpty(data.name)) {
            errors.name = 'Name is required';
        }
    }

    if (data.description){
        data.description = validText(data.description) ? data.description : '';
        if (Validator.isEmpty(data.description)) {
            errors.description = 'Description is required';
          }
        if (!Validator.isLength(data.description, { min: 30 })) {
            errors.description = 'Description must be longer';
        }
    }
   
    if (data.lat){
        if (!Validator.isFloat(data.lat)) {
            errors.description = 'Coordinates are not valid';
        }
    }
    
    if (data.long){
        if (!Validator.isFloat(data.long)) {
            errors.description = 'Coordinates are not valid';
        }
    }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
};

  
  
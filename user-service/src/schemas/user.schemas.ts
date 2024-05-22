/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';

export const Userschema = new mongoose.Schema({

  FirstName: {type : String , required : true} ,
  LastName: {type : String , required : true} ,
  email: {type : String , required : true , unique : true} ,
  password: {type : String , required : true} ,
  phone: {type : String , required : true} ,
  company: {type: String , required : true} ,
  address: [{
    label: { type: String, required: true },
<<<<<<< HEAD
    appartment: { type: String, required: true },
    floor: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
    postalcode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    extra_description: { type: String, required: true }
  }],
  cards: [{
    name: { type: String, required: true },
    cardnumber: { type: String, required: true },
    expiration: { type: String, required: true },
    cvv: { type: String, required: true },
    // _id: { type: String }
=======
    address: { type: String, required: true }
>>>>>>> e4cc43b3 (Initial)
  }],
  role: {
    type: String,
    required: true,
    default: 'user',
    validate: {
      validator: function(value) {
        return ['user', 'admin'].includes(value.toLowerCase());
      },
      message: props => `${props.value} is not a valid role. Only 'user' or 'admin' are allowed.`

    }
  },
  Verification : {type : Boolean , default : false},
  VerificationCode : {type : String},
  ordersQueue: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }],
    default: []
  
  }

});

Userschema.pre('save', function(next) {
  if (this.role !== 'admin') {
    // If the role is not admin, remove the ordersQueue field
    this.ordersQueue = undefined;
  }
  next();
});
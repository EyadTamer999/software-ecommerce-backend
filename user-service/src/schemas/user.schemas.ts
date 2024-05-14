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
    address: { type: String, required: true }
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
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
   firstName: {
       type: String
   },
   lastName: {
       type: String,
   },
   contact: {
       type: String,
   },
   address: {
       type: String
   },
   city: {
       type: String
   },
   province: {
       type: String
   },
   country: {
       type: String
   },
   postalCode: {
       type: String
   },
   email: {
       type: String,
   }
});

module.exports = mongoose.model('Client',clientSchema);
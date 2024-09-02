

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FacultySchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  school: {
    type: String,
    // required: true,
  },
  qualification : {
    type: String,
    // required: true,
  },
experience: {
    type: Number,
    // required: true,
  },
 image: {
    type: String,
    // required: true,
  },

  subjects: {
    type: String,
    // required: true,
  },

    research: {
    type: String,
    // required: true,
  },
    biodata: {
    type: String,
    // required: true,
  },
   email: {
    type: String,
    // required: true,
  },
   phone: {
    type: Number,
    // required: true,
  },
   publication: {
    type: String,
    // required: true,
  }
},
   {
    collection: 'Faculty'
  }
)

module.exports = mongoose.model('Faculty', FacultySchema)
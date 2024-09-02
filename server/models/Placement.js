

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlacementSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  stream: {
    type: String,
    // required: true,
  },
  company: {
    type: String,
    // required: true,
  },
 year: {
    type: Number,
    // required: true,
  },
  collage: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
},
   {
    collection: 'placements'
  }
)

module.exports = mongoose.model('Placement', PlacementSchema)
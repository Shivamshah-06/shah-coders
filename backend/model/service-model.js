const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  provide: { type: String, required: true },
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;

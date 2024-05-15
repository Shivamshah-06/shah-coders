const Service = require("../model/service-model");
const service = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "No services found" });
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { service };

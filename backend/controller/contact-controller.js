const contactUser = require("../model/contact-mode");

const contact = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const user = await contactUser.create({ username, email, message });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};
module.exports = { contact };

const contactUser = require("../model/contact-mode");
const User = require("../model/user-model");

const getUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Delete Sucessfully" });
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select({ password: 0 });
    return res.status(200).json({ user });
  } catch (error) {
    res.status(404).json(error);

    next(error);
  }
};
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const UpdatedUser = req.body;
    const updatingUser = await User.updateOne(
      { _id: id },
      {
        $set: UpdatedUser,
      }
    );
    return res.status(200).json(updatingUser);
  } catch (error) {
    next(error);
  }
};
const getContactData = async (req, res) => {
  try {
    const contactData = await contactUser.find();
    if (!contactData || contactData.length === 0) {
      return res.status(404).json({ message: "No contactdataFound" });
    }
    res.status(200).json(contactData);
  } catch (error) {
    next(error);
  }
};
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await contactUser.deleteOne({ _id: id });
    res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUser,
  getContactData,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};

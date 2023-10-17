import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, { skip, limit }).populate(
    "owner",
    "name email phone"
  );
  return res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findById({ id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found `);
  }
  return res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create(...req.body, owner);
  return res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ id: id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  return res.json(result);
};

const getFavorites = async (req, res) => {
  const { _id: owner } = req.user;
  const favorites = await Contact.find({ owner, favorite: true });
  return res.json(favorites);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ id: id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  return res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ id: id });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  return res.json({
    message: "contact deleted",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  getFavorites: ctrlWrapper(getFavorites),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};

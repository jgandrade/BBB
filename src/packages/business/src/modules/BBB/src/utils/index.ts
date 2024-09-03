import mongoose from "mongoose";

export const toObjectId = (objectId: string | mongoose.Types.ObjectId) => {
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    throw new Error(`Invalid ObjectId: ${objectId}`);
  }
  return new mongoose.Types.ObjectId(objectId);
};

export const toString = (value: mongoose.Types.ObjectId) => value.toString();

export const createObjectId = () => new mongoose.Types.ObjectId();

export const createObjectIdString = () =>
  new mongoose.Types.ObjectId().toString();

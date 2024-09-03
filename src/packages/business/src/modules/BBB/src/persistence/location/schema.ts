import mongoose from "mongoose";
import { ITimestamps } from "../common/types";

const locationSchemaOptions = { timestamps: true };

interface ILocationWithoutTimestamps {
  _id: mongoose.Types.ObjectId;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  isTracked: boolean;
}

type ILocationSchema = ILocationWithoutTimestamps & ITimestamps;

const locationSchema = new mongoose.Schema<ILocationSchema>(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    isTracked: {
      type: Boolean,
      required: false,
    },
  },
  locationSchemaOptions
);

const Location = mongoose.model<ILocationSchema>("Location", locationSchema);

export { Location, ILocationSchema, ILocationWithoutTimestamps };

import mongoose from "mongoose";
import { ITimestamps } from "../common/types";

const businessSchemaOptions = { timestamps: true };

interface IBusinessWithoutTimestamps {
  _id: mongoose.Types.ObjectId;
  name: string;
}

type IBusinessSchema = IBusinessWithoutTimestamps & ITimestamps;

const businessSchema = new mongoose.Schema<IBusinessSchema>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  businessSchemaOptions
);

const Business = mongoose.model<IBusinessSchema>("Business", businessSchema);

export { Business, IBusinessSchema, IBusinessWithoutTimestamps };

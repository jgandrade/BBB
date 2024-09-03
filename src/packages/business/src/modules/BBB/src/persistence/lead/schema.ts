import mongoose from "mongoose";
import { ITimestamps } from "../common/types";

const leadSchemaOptions = { timestamps: true };

interface ILeadWithoutTimestamps {
  _id: mongoose.Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  link: string;
  contactNumber: string;
  business: string;
  owner: string;
}

type ILeadSchema = ILeadWithoutTimestamps & ITimestamps;

const leadSchema = new mongoose.Schema<ILeadSchema>(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    link: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    business: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  leadSchemaOptions
);

const Lead = mongoose.model<ILeadSchema>("Lead", leadSchema);

export { Lead, ILeadSchema, ILeadWithoutTimestamps };

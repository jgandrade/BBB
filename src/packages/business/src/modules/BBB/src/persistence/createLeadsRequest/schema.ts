import mongoose from "mongoose";
import { ITimestamps } from "../common/types";
import { LeadRequestStatus } from "../../domain/models/createLeadsRequest/createLeadsRequest";

interface ICreateLeadsRequestWithoutTimestamps {
  _id: mongoose.Types.ObjectId;
  businessName: string;
  location: string;
  idempotencyKey: {
    businessName: string;
    location: string;
  };
  status: LeadRequestStatus;
}

type ICreateLeadsRequestSchema = ICreateLeadsRequestWithoutTimestamps &
  ITimestamps;

const createLeadsRequestSchemaOptions = { timestamps: true };

const createLeadsRequestSchema = new mongoose.Schema<ICreateLeadsRequestSchema>(
  {
    businessName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    idempotencyKey: {
      businessName: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
    },
  },
  createLeadsRequestSchemaOptions
);

const CreateLeadsRequestModel = mongoose.model<ICreateLeadsRequestSchema>(
  "CreateLeadsRequest",
  createLeadsRequestSchema
);

export {
  CreateLeadsRequestModel,
  ICreateLeadsRequestSchema,
  ICreateLeadsRequestWithoutTimestamps,
};

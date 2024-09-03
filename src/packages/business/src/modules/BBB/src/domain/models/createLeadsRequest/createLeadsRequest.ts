import { createObjectIdString } from "../../../utils";

export interface ICreateLeadsCommonRequest {
  id: string;
  status: LeadRequestStatus;
  idempotencyKey: ISharedProperties;
  createdAt?: Date;
  updatedAt?: Date;
}

export const LEAD_REQUEST_STATUS = {
  INPROGRESS: "INPROGRESS",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
} as const;

export type LeadRequestStatus =
  (typeof LEAD_REQUEST_STATUS)[keyof typeof LEAD_REQUEST_STATUS];

interface ISharedProperties {
  businessName: string;
  location: string;
}

export type ICreateLeadsRequest = ICreateLeadsCommonRequest & ISharedProperties;

class CreateLeadsRequest implements ICreateLeadsRequest {
  readonly id: string;

  readonly location: string;

  readonly businessName: string;

  readonly idempotencyKey: ISharedProperties;

  private _status: LeadRequestStatus;

  createdAt?: Date;

  updatedAt?: Date;

  protected constructor({
    id,
    businessName,
    location,
    idempotencyKey,
    status,
    createdAt,
    updatedAt,
  }: {
    id: string;
    businessName: string;
    location: string;
    idempotencyKey: ISharedProperties;
    status: LeadRequestStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.businessName = businessName;
    this.location = location;
    this.idempotencyKey = idempotencyKey;
    this._status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    id = createObjectIdString(),
    businessName,
    location,
    idempotencyKey = { businessName, location },
    status = LEAD_REQUEST_STATUS.INPROGRESS,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    businessName: string;
    location: string;
    idempotencyKey?: ISharedProperties;
    status?: LeadRequestStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new CreateLeadsRequest({
      id,
      businessName,
      location,
      idempotencyKey,
      status,
      createdAt,
      updatedAt,
    });
  }

  get status() {
    return this._status;
  }

  set currentStatus(status: LeadRequestStatus) {
    this._status = status;
  }
}

export { CreateLeadsRequest };

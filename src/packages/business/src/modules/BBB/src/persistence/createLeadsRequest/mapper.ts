import {
  CreateLeadsRequest,
  ICreateLeadsRequest,
} from "../../domain/models/createLeadsRequest/createLeadsRequest";
import {
  ICreateLeadsRequestSchema,
  ICreateLeadsRequestWithoutTimestamps,
} from "./schema";
import { toObjectId, toString } from "../../utils";

export default class CreateLeadsRequestMapper {
  public static toDomain(
    schemaObject: ICreateLeadsRequestSchema
  ): ICreateLeadsRequest {
    const requestObject = CreateLeadsRequest.create({
      id: toString(schemaObject._id),
      businessName: schemaObject.businessName,
      location: schemaObject.location,
      idempotencyKey: schemaObject.idempotencyKey,
      status: schemaObject.status,
      createdAt: schemaObject.createdAt,
      updatedAt: schemaObject.updatedAt,
    });

    return requestObject;
  }

  public static toPersistence(
    domainObject: ICreateLeadsRequest
  ): ICreateLeadsRequestWithoutTimestamps {
    const schemaObject: ICreateLeadsRequestWithoutTimestamps = {
      _id: toObjectId(domainObject.id),
      businessName: domainObject.businessName,
      location: domainObject.location,
      idempotencyKey: domainObject.idempotencyKey,
      status: domainObject.status,
    };

    return schemaObject;
  }
}

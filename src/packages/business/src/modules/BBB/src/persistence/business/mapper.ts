import { Business, IBusiness } from "../../domain/models/business/business";
import { IBusinessSchema, IBusinessWithoutTimestamps } from "./schema";
import { toObjectId, toString } from "../../utils";

export default class BusinessMapper {
  public static toDomain(schemaObject: IBusinessSchema): IBusiness {
    const businessObject = Business.create({
      id: toString(schemaObject._id),
      name: schemaObject.name,
      createdAt: schemaObject.createdAt,
      updatedAt: schemaObject.updatedAt,
    });

    return businessObject;
  }

  public static toPersistence(
    domainObject: IBusiness
  ): IBusinessWithoutTimestamps {
    const schemaObject: IBusinessWithoutTimestamps = {
      _id: toObjectId(domainObject.id),
      name: domainObject.name,
    };

    return schemaObject;
  }
}

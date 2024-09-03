import { Location, ILocation } from "../../domain/models/location/location";
import { ILocationSchema, ILocationWithoutTimestamps } from "./schema";
import { toObjectId, toString } from "../../utils";

export default class LocationMapper {
  public static toDomain(schemaObject: ILocationSchema): ILocation {
    const locationObject = Location.create({
      id: toString(schemaObject._id),
      country: schemaObject.country,
      city: schemaObject.city,
      state: schemaObject.state,
      zipCode: schemaObject.zipCode,
      isTracked: schemaObject.isTracked,
      createdAt: schemaObject.createdAt,
      updatedAt: schemaObject.updatedAt,
    });

    return locationObject;
  }

  public static toPersistence(
    domainObject: ILocation
  ): ILocationWithoutTimestamps {
    const schemaObject: ILocationWithoutTimestamps = {
      _id: toObjectId(domainObject.id),
      country: domainObject.country,
      city: domainObject.city,
      state: domainObject.state,
      zipCode: domainObject.zipCode,
      isTracked: domainObject.isTracked,
    };

    return schemaObject;
  }
}

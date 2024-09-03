import { ClientSession } from "mongoose";
import LocationMapper from "./mapper";
import { Location as LocationModel } from "./schema";
import { ILocation } from "../../domain/models/location/location";

export default class LocationRepository {
  private models: {
    LocationModel: typeof LocationModel;
  };

  private mappers: { LocationMapper: typeof LocationMapper };

  constructor(
    models = {
      LocationModel,
    },
    mappers = {
      LocationMapper,
    }
  ) {
    this.models = models;
    this.mappers = mappers;
  }

  public async save(location: ILocation, session?: ClientSession) {
    const schema = this.mappers.LocationMapper.toPersistence(location);

    await this.models.LocationModel.create([schema], { session });
  }

  public async findById(id: string) {
    const location = await this.models.LocationModel.findById(id).lean();

    if (location === null) {
      return null;
    }

    const domainObject = this.mappers.LocationMapper.toDomain(location);

    return domainObject;
  }
}

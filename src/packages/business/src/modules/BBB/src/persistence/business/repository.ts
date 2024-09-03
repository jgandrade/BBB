import { ClientSession } from "mongoose";
import BusinessMapper from "./mapper";
import { Business as BusinessModel } from "./schema";
import { IBusiness } from "../../domain/models/business/business";

export default class BusinessRepository {
  private models: {
    Business: typeof BusinessModel;
  };

  private mappers: { BusinessMapper: typeof BusinessMapper };

  constructor(
    models = {
      Business: BusinessModel,
    },
    mappers = {
      BusinessMapper,
    }
  ) {
    this.models = models;
    this.mappers = mappers;
  }

  public async save(business: IBusiness, session?: ClientSession) {
    const schema = this.mappers.BusinessMapper.toPersistence(business);

    await this.models.Business.create([schema], { session });
  }

  public async findById(id: string) {
    const business = await this.models.Business.findById(id).lean();

    if (business === null) {
      return null;
    }

    const domainObject = this.mappers.BusinessMapper.toDomain(business);

    return domainObject;
  }
}

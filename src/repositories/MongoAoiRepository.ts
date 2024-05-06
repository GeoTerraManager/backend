import MongoRepository from "./MongoRepository";

export default class MongoAoiRepository extends MongoRepository {
  async createAoisCollectionBasedOnTempAoi(): Promise<void> {
    const db = await this.connect("api")
    const temp_aoi = db.collection("temp_aoi")

    const resultado = temp_aoi.find(
      {},
      {
        projection: {
          _id: 0,
          name: 1,
          crs: { $substr: ["$crs.properties.name", 22, -4] },
          features: 1
        }
      }
    );

    const aois = db.collection("aois");

    const documentos = await resultado.toArray();

    await aois.drop();
    await aois.insertMany(documentos);
  }
}

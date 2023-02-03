class Queries {
  static async saveDocument(Model: any, data: object) {
    return new Promise((resolve, reject) => {
      try {
        let doc = new Model(data);
        let result = doc.save();
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
  static async createDocument(Model: any, data: any) {
    return new Promise((resolve, reject) => {
      try {
        let result = Model.create(data);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
  static async getData(Model: any, query: any, projection: any, options: any) {
    return new Promise((resolve, reject) => {
      try {
        let result = Model.find(query, projection, options);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
  static async getDetails(
    Model: any,
    query: any,
    projection: any,
    options: any
  ) {
    return new Promise((resolve, reject) => {
      try {
        let result = Model.findOne(query, projection, options);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
  static async aggregate(Model: any, pipeline: any) {
    return new Promise((resolve, reject) => {
      try {
        let data = Model.aggregate(pipeline);
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }
  static async findOneAndUpdate(
    Model: any,
    query: any,
    body: any,
    options: any
  ) {
    return new Promise((resolve, reject) => {
      try {
        let data = Model.findOneAndUpdate(query, body, options);
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }
  static async deleteOne(Model: any, query: any) {
    return new Promise((resolve, reject) => {
      try {
        let data = Model.deleteOne(query);
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export default Queries;

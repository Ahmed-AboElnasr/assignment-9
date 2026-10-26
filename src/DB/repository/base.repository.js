class BaseRepository {
  model;
  constructor(model) {
    this.model = model;
  }

  createDocument(data) {
    return this.model.create(data);
  }

  findOneDocument(filters = {}) {
    return this.model.findOne(filters);
  }

  findDocumentById(id) {
    return this.model.findById(id);
  }

  findByIdAndUpdateDocument(id, updateData, options) {
    return this.model.findByIdAndUpdate(id, updateData, options);
  }

  findOneAndUpdateDocument(filters, updateData, options) {
    return this.model.findOneAndUpdate(filters, updateData, options);
  }

  findByIdAndDeleteDocument(id) {
    return this.model.findByIdAndDelete(id);
  }

  findWithBagination(skip, limit) {
    return this.model.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  }

  countDocuments() {
    return this.model.countDocuments();
  }
}

export default BaseRepository;

const VehicleCategory = require("../models/VehicleCategory");
const xss = require("xss");

class VehicleCategoryService {
  async createCategory(userId, vehicleCategoryData) {
    const { type, description } = vehicleCategoryData;
    if (!type) {
      throw new Error("Type is required");
    }

    const sanitizedType = xss(type);
    const sanitizedDescription = xss(description);

    const category = new VehicleCategory({
      type: sanitizedType,
      description: sanitizedDescription,
      user: userId,
    });

    await category.save();

    return category;
  }

  async getAllCategories() {
    const categories = await VehicleCategory.find();
    if (categories.length < 1) {
      throw new Error("Categories not found");
    }
    return categories;
  }

  async getCategoryById(id) {
    if (!id) {
      throw new Error("ID is required");
    }

    const category = await VehicleCategory.findById(id);

    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async updateCategory(id, userId, categoryData) {
    try {
      if (!categoryData.type || categoryData.type.trim() === "") {
        throw new Error("Type is required");
      }

      const sanitizedType = xss(categoryData?.type);
      const sanitizedDescription = xss(categoryData?.description);

      const category = await VehicleCategory.findOne({
        _id: id,
        user: userId,
      });

      if (!category) {
        throw new Error("Category not found");
      }

      const updatedCategory = await VehicleCategory.findOneAndUpdate(
        { _id: id, user: userId },
        { type: sanitizedType, description: sanitizedDescription },
        { new: true }
      );

      return updatedCategory;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteCategory(userId, id) {
    const category = await VehicleCategory.findOne({ _id: id, user: userId });
    if (!category) {
      throw new Error("Category not found");
    }

    await VehicleCategory.deleteOne({ _id: id });

    return { message: "Category deleted successfully" };
  }
}

module.exports = new VehicleCategoryService();

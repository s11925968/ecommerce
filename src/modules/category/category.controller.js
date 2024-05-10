import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js"
import cloudinary from "../../utls/cloudinary.js"
import { request } from "express";
export const create=async(req,res)=>{
  const name=req.body.name.toLowerCase();
  if(await categoryModel.findOne({name})){
    return res.status(409).json({message:"Category already exists"})
  }
  const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:"tshop5/categories"
  })
  const slug=slugify(name,'@');
  req.body.createdBy=req.user._id;
  req.body.updatedBy=req.user._id;

  const category=await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id}})
  return res.json({message:category});
}
export const getAll=async (req, res) => {

  const categories = await categoryModel.find({});
  return res.status(200).json({ message: "success", categories });
}
export const getActive=async (req, res) => {

  const categories = await categoryModel.find({status: 'active'}).select("name ");
  return res.status(200).json({ message: "success", categories });
}
export const getDetails=async(req,res)=>{
  const categories=await categoryModel.find(req.params._id);
  return res.status(200).json({message:"success",categories});
}
export const update = async(req, res) => {
    try {
        // Find the category by ID
        const category = await categoryModel.findById(req.params.id);
        
        // If no category is found, return a 404 error
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name=req.body.name.toLowerCase();
        if(await categoryModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
            return res.status(404).json({ message: "Category error" });
        }
        category.slug=slugify(req.body.name);
        if(req.file){
            const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
                folder:"category"
            })
            category.image={secure_url,public_id};
        }
        category.status=req.body.status;
        await category.save();
        return res.json({message:"success",category:category});
    } catch (error) {
        // Error handling
        console.error("Failed to update category:", error);
        return res.status(500).json({ message: "Failed to update category", error: error.message });
    }
}
export const deleteCategory = async (req, res) => {
  try {
      // Attempt to find and delete the category by ID
      const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);

      // If no category was found and deleted, return a 404 error
      if (!deletedCategory) {
          return res.status(404).json({ message: "Category not found" });
      }

      // If the category was deleted successfully, return success message
      return res.json({ message: "success" });
  } catch (error) {
      // If an error occurs, log it and return a 500 internal server error
      console.error("Error deleting category:", error);
      return res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
}
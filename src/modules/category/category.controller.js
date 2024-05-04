import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js"
import cloudinary from "../../utls/cloudinary.js"
export const create=async(req,res)=>{
  const name=req.body.name.toLowerCase();
  if(await categoryModel.findOne({name})){
    return res.status(409).json({message:"Category already exists"})
  }
  const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:"tshop5/categories"
  })
  const slug=slugify(name,'@');
  const category=await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id}})
  return res.json({message:category});
}

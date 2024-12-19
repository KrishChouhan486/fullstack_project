import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload files to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) {
        console.error("File path is not provided for upload.");
        return null;
      }
  
      // Upload the file to Cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto", // Automatically detect the file type
      });
  
      console.log("File successfully uploaded to Cloudinary:", response.url);
  
      // Remove the locally saved temporary file
      fs.unlinkSync(localFilePath);
  
      return response;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
  
      // Ensure the local file is deleted even if the upload fails
      try {
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
      } catch (unlinkError) {
        console.error("Error deleting local file after Cloudinary upload failed:", unlinkError);
      }
  
      return null;
    }
  };
  
  // Function to delete files from Cloudinary
  const deleteFromCloudinary = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId)
      console.log("Delete from cloudinary .public id", publicId)
    } catch (error) {
      console.error(`Error deleting file with Public ID "${publicId}":`, error);
      return null;
    }
  };
  
  export { uploadOnCloudinary, deleteFromCloudinary };
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { asyncHandler } from "../utils/asyncHandler.js"; // Ensure the file exists and extension is correct

// // Using a normal function
// async function healthcheck(req, res) {
//     return res
//         .status(200)
//         .json(new ApiResponse(200, "OK", "Health check passed"));
// }
// arrow function

const healthcheck = asyncHandler(async(req,res)=>{
    
    return res
    .status(200)
    .json(new ApiResponse(200, "OK", "Health check passed"))
})

// Wrapping the normal function with asyncHandler
export default asyncHandler(healthcheck);

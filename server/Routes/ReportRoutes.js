import express from "express";
import openAi_Api from "../Services/OpenAiApi.js";
import rateLimit from "express-rate-limit";


const router = express.Router();



router.use(rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 1, 
  message: {
    success: false,
    error: "Daily limit reached",
    info: "You can only make 1 free request per 24 hours from the same IP.",
    support: "If you'd like unlimited access and to help us cover hosting & API costs, please consider donating."
  }
}));


router.post("/create-report" , async(req , res) => {
  const { text } = req.body;
  try {
      let data = await openAi_Api(text);
     return res.status(200).json({success : true , message : data})
  } catch (error) {
    console.log(error);
    res.status(500).json({success : false , message : error})
  }
} )



export default router ; 
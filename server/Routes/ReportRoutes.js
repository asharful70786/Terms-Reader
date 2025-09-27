import express from "express";
import openAi_Api from "../Services/OpenAiApi.js";


const router = express.Router();

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
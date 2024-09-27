import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import  Configuration  from 'openai';



dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });

router.route('/').get((req, res) => {
res.send('Hello AI Image Generation App!' );
});

router.route('/').post(async (req, res) => {
try {
const { prompt } = req.body;

const aiResponse = await openai.images.generate({
  prompt,
  n: 1,
  size: '1024x1024',
  response_format: 'b64_json',
});

const image = aiResponse.data[0].b64_json;
res.status(200).json({ photo: image });
} catch (error) {
console.error(error);
res.status(500).send(error?.response.data.error.message || 'Something went wrong');
}
});

export default router;
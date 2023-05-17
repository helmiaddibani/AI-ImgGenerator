import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const router = express.Router()

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY, //accessing .env file and grab api key
})

const openai = new OpenAIApi(configuration)

router.route('/').get((req,res) => {
    res.send('Hellloooooooooo from bang jali')
})

router.route('/').post(async(req,res) => {
    console.log('inside post')
    try{
        const { prompt } = req.body //this promt is taken form the front-end

        const aiResponse = await openai.createImage({ // this are the parameters passed to open AI api
            prompt,
            n: 1, //number of images being generated
            size: '512x512',
            response_format: 'b64_json'
        })

        const image = aiResponse.data.data[0].b64_json 

        res.status(200).json({photo: image})        

    }catch(error){

        console.log(error)
        res.status(500).send(error?.response.data.error.message)
    }


})


export default router
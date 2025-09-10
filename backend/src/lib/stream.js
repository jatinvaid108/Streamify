import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey=process.env.STREAM_API_KEY
const apiSecret=process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream API Key or Secret is missing");
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async (userData)=>{
    try{
        await streamClient.upsertUsers([userData]);   //upsert means update or create
        return userData
    }
    catch(error){
        console.error("Error upserting Stream User:",error);
    };

}

//todo: Do it Later
export const generateStreamToken= (userId)=>{};
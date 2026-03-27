
import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
model: "mistral-large-latest",
apiKey: process.env.MISTRAL_API_KEY
});
export async function MistralAi() {
  const response =  await model.invoke("What is the capital of india?")
  console.log(response.text)
}
 



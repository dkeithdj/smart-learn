import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// Build a prompt from the messages
function buildPompt(
  messages: { content: string; role: "system" | "user" | "assistant" }[]
) {
  return (
    messages
      .map(({ content, role }) => {
        if (role === "user") {
          return `<|prompter|>${content}<|endoftext|>`;
        } else {
          return `<|assistant|>${content}<|endoftext|>`;
        }
      })
      .join("") + "<|assistant|>"
  );
}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const response = await Hf.textGenerationStream({
    model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    inputs: buildPompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
    },
  });

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database
      // await savePromptToDatabase(prompt);
      // console.log(`User: ${messages.map(({ content }) => content)}`);
      const mes = messages[messages.length - 1]["content"];
      console.log(messages);
      console.log(typeof mes);
      // await prisma.prompt.create({ data: { prompt: mes } });
    },
    onToken: async (token: string) => {
      // This callback is called for each token in the stream
      // You can use this to debug the stream or save the tokens to your database
      // console.log(token);
    },
    onCompletion: async (completion: string) => {
      // This callback is called when the stream completes
      // You can use this to save the final completion to your database
      // await saveCompletionToDatabase(completion);
      console.log(`AI: ${completion}`);
      // await prisma.completion.create({ data: { completion: completion } });
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

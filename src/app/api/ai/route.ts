import { openrouter } from "@/ai/open-router";
import { tools } from "@/ai/tools";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { messages } = await request.json()

    const result = streamText({
        model: openrouter.chat('openrouter/free'),
        tools,
        messages,
        maxSteps: 5,
        system: `Sempre responda em markdown sem aspas no início ou fim da mensagem`,
        onError(error) {
            // 🔥 AQUI você vai ver o erro real
            console.error("STREAM ERROR:", error);
        },
        onFinish(event) {
            console.log("STREAM FINISHED:", event);
        },
    })

    return result.toDataStreamResponse()
}
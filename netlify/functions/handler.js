import { schedule } from "@netlify/functions";

const handlerFn = async () => {
    return {
        statusCode: 200,
        body: "ok"
    }
}

export const handler = schedule("* * * * *", handlerFn)
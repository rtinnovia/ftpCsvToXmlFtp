const { schedule } = require("@netlify/functions");

const handler = schedule("* * * * *", () => {
    console.log("Print this message every ...");
});

export { handler }
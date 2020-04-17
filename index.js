//require("dotenv").config();
const server = require("./server");

//  Define port
const port = process.env.PORT || 8000;

//  Start server
server.listen(port, () => {
    console.log(`Server listening at localhost:${port}`);
});

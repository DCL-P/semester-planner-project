// DEV NOTE deze folder voor nu nog niet nodig dit is voor de connectie met de backend op te zetten
import http from "node:http";
import { readFile } from "node:fs/promises";


//frontend node server
const server = http.createServer(async (req, resp)=>{
    if (req.url !== "/") {
        resp.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
        resp.end("Not found");
        return;
    }

    const homeHtml = await readFile(new URL("../home.html", import.meta.url));
    resp.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    resp.end(homeHtml);
});

server.listen(1500, () => {
    console.log("listening");
});


//API connection with backend
const response = await fetch('http://localhost:3000', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({
    message: 'WSG BACKEND',
}),
});

console.log(await response.json());
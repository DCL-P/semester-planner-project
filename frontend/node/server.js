// DEV NOTE deze folder voor nu nog niet nodig dit is voor de connectie met de backend op te zetten
import http from "node:http";


//frontend node server
const server = http.createServer((req, resp)=>{
    resp.writeHead(200, {"Content-Type": "../home.html"});
    resp.end("hELLO FROM LAN WOOOAAAAAHHHHHOOOOOOOOOOO");
});

server.listen(1500, "0.0.0.0", () => {
    console.log("listening");
});




//API connection with backend
const response = await fetch('http://192.168.1.3:3000', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({
    message: 'WSG BACKEND',
}),
});

console.log(await response.json());
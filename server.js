// Importing the required modules
const http = require("http");
const uuid = require("uuid");

// Creating an HTTP server
const server = http.createServer((req, res) => {
  // Parsing the URL for further handling
  const url = req.url.split("/");

  // Handling GET requests
  if (req.method == "GET") {
    // Handling the root URL ("/")
    if (url.length == 2 && url[0] == "" && url[1] == "") {
      // Sending a plain text response for the root URL
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Hello World");
      res.end();
    }
    // Handling URL with "/html" path
    else if (url.length == 2 && url[1] == "html") {
      // Sending an HTML response
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<!DOCTYPE html>
            <html>
              <head>
              </head>
              <body>
                  <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
                  <p> - Martin Fowler</p>
              </body>
            </html>`);
      res.end();
    }
    // Handling URL with "/json" path
    else if (url.length == 2 && url[1] == "json") {
      // Sending a JSON response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          slideshow: {
            author: "Yours Truly",
            date: "date of publication",
            slides: [
              {
                title: "Wake up to WonderWidgets!",
                type: "all",
              },
              {
                items: [
                  "Why <em>WonderWidgets</em> are great",
                  "Who <em>buys</em> WonderWidgets",
                ],
                title: "Overview",
                type: "all",
              },
            ],
            title: "Sample Slide Show",
          },
        })
      );
      res.end();
    }
    // Handling URL with "/uuid" path
    else if (url.length == 2 && url[1] == "uuid") {
      // Sending a JSON response with a generated UUID
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ uuid: uuid.v4() }));
      res.end();
    }
    // Handling URL with "/status/{statusCode}" path
    else if (url.length == 3 && url[1] == "status") {
      // Sending a response with a specified HTTP status code
      res.writeHead(parseInt(url[2]), { "Content-Type": "text/plain" });
      res.write("This is a response page with a different status code");
      res.end();
    }
    // Handling URL with "/delay/{seconds}" path
    else if (url.length == 3 && url[1] == "delay") {
      // Introducing a delay and sending a response
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("This will come after some delay");
        res.end();
      }, url[2] * 1000);
    }
    // Handling other undefined paths
    else {
      // Sending a 404 Not Found response
      res.writeHead(404);
      res.write("Page not found");
      res.end();
    }
  }
});

// Setting up the server to listen on port 8000
server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});

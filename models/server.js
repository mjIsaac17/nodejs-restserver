const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathUsers = "/api/users";

    // Middlewares -> functions that always run after starting our server
    this.middlewares();

    // Application routes
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lecture and body parser
    this.app.use(express.json());

    //Public directory
    //All middlewares use the word 'use' (app.use ...)
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.pathUsers, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server runnning on port", this.port);
    });
  }
}

module.exports = Server;

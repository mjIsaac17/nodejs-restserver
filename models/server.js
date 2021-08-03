const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      users: "/api/users",
    };

    // Connect to database
    this.connectToDB();

    // Middlewares -> functions that always run after starting our server
    this.middlewares();

    // Application routes
    this.routes();
  }

  async connectToDB() {
    await dbConnection();
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
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.categories, require("../routes/category.routes"));
    this.app.use(this.paths.products, require("../routes/product.routes"));
    this.app.use(this.paths.search, require("../routes/search.routes"));
    this.app.use(this.paths.users, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server runnning on port", this.port);
    });
  }
}

module.exports = Server;

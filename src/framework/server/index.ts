import express from "express";
import path from "path";
import "reflect-metadata";
import { validateInputs } from "../Middleware/validation";
import "dotenv/config";

const app = express();
app.use(express.static(path.join(__dirname, "")));

export function factorRoutes(controller) {
  const routes = Reflect.getMetadata("routes", controller);
  routes.forEach((route) => {
    app[route.method](route.url, validateInputs(route), (req, res) => {
      const response = controller[route.name](...res.locals.inputs);
      if (typeof response === "object") {
        res.json(response);
      } else {
        res.send(response);
      }
    });
  });
}

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

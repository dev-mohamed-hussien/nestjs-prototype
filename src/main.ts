import { Controller } from "./modules/users/users.controller";
import { factorRoutes } from "./framework/server/index";

const controller = new Controller();

factorRoutes(controller);

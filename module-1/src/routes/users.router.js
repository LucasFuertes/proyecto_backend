import { Router } from "express";
import * as UserController from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/current", UserController.GETCurrentUser);

usersRouter.get("/:uid", UserController.GETUserById);

export default usersRouter;

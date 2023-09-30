import { Router } from "express";
import * as DataDummy from "../controllers/mocks.controller.js";

export const mocks = Router();

mocks.get("/", DataDummy.GETFakeProducts);

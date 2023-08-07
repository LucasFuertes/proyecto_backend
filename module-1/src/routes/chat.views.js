import { Router } from "express";
import msgModel from "../dao/models/msg.schema.js";

export const msgsRouterRender = Router();

msgsRouterRender.get("/", async (req, res) => {
  const dbMsgs = await msgModel.find();
  res.render("chat", { dbMsgs });
});

msgsRouterRender.post("/", async (req, res) => {
  const { msgBody } = req.body;
  const msg = await msgModel.insertMany(msgBody);
  res.render("chat", { msgInfo: msg });
});

import { Command } from "commander";
import dotenv from "dotenv";

const command = new Command();

command.option("--mode <mode>", "mode of execution", "prod");
command.parse();
const options = command.opts();
console.log(options);

dotenv.config({
  path: options.mode == "dev" ? "../../.env.dev" : "../../.env.prod",
});

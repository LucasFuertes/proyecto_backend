import enumError from "./enumError.js";

const ErrorHandlerMw = (error, req, res, next) => {
  console.log(error);

  switch (error.code) {
    case enumError.ROUTING_ERROR:
      res.status(400).send({ error: true, msg: error.name });
      break;
    case enumError.SERVICE_ERROR:
      res.status(500).send({ error: true, msg: error.name });
      break;
    case enumError.DATABASE_ERROR:
      res.status(500).send({ error: true, msg: error.name });
      break;
    case enumError.USER_INPUT_ERROR:
      res.send({ error: true, msg: error.name });
      break;
    default:
      res.send({ error: true, msg: "unhandled error/promise" });
      break;
  }
};

export default ErrorHandlerMw;

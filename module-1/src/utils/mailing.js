import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "loyal55@ethereal.email",
    pass: "qutczsebbCBp9E5kUD",
  },
});

export default transport;

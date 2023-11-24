import jwt from "jsonwebtoken";

const SECRET = "829i73tr89437ty984wye3t";

const token = jwt.sign(
  { id: 1, name: "Ruperto", lastName: "Mendez", age: 30 },
  SECRET,
  { expiresIn: "1hr" }
);
console.log(token);
console.log(
  "///////////////////////////////////////////////////////////////////"
);

const tokenInvalid =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlJ1cGVydG8iLCJsYXN0TmFtZSI6Ik1lbmRleiIsImFnZSI6MzAsImlhdCI6MTY5OTk5NzYwMSwiZXhwIjoxNzAwMDA";

try {
  const verify = jwt.verify(tokenInvalid, SECRET);
  console.log(verify);
} catch (e) {
  console.error(e);
}

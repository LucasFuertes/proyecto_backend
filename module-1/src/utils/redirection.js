export const logged = (req, res, next) => {
  console.log(req.user);
  if (req.user) return res.redirect("/products");
  next();
};

export const notLogged = (req, res, next) => {
  console.log(req.user);
  if (!req.user) return res.redirect("/");
  next();
};

// export const onlyUser = (req, res, next) => {
//   if (req.user.role != "user")
//     return res.send("No posee autorización para ingresar a esta ruta");
//   next();
// };

// export const onlyAdmin = (req, res, next) => {
//   if (req.user.role != "admin")
//     return res.send("No posee autorización para ingresar a esta ruta");
//   next();
// };

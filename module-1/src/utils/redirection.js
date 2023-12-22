export const logged = (req, res, next) => {
  console.log(req.user);
  if (req.user) return res.redirect("/");
  next();
};

export const notLogged = (req, res, next) => {
  console.log(req.user);
  if (!req.user) return res.redirect("/login");
  next();
};

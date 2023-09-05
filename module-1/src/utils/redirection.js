export const logged = (req, res, next) => {
  if (req.user) return res.redirect("/products");
  next();
};

export const notLogged = (req, res, next) => {
  if (!req.user) return res.redirect("/api/sessions/login");
  next();
};

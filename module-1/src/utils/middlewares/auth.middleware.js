export const onlyAdmin = (req, res, next) => {
  if (req.user.role != "admin") return res.send("Solo pueden entrar un admin");
  next();
};

export const onlyUser = (req, res, next) => {
  if (req.user.role != "user") return res.send("Solo pueden entrar un user");
  next();
};

export const onlyPremium = (req, res, next) => {
  if (req.user.role != "premium")
    return res.send("Solo pueden entrar un premium");
  next();
};

export const msgNotLogged = (req, res, next) => {
  if (!req.user)
    return res.send({ msg: "No tienes iniciado sesión en la página" });
  next();
};

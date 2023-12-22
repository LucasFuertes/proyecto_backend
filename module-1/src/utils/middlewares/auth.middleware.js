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
  if (!req.user) return res.send("No tienes iniciado sesión en la página");
  next();
};

export const blockAdmin = (req, res, next) => {
  // console.log("//////////bloqueo de admin////////////");
  // console.log(req.user);
  if (req.user.role == "admin") {
    return res.send("Es admin, no puede acceder a esta ruta");
  }
  next();
};

export const blockUser = (req, res, next) => {
  // console.log("//////////bloqueo de user////////////");
  // console.log(req.user);
  if (req.user.role == "user") {
    return res.send("Es user, no puede acceder a esta ruta");
  }
  next();
};

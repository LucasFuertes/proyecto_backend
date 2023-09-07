import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/mongo/userManager.js";
import GithubStrategy from "passport-github2";

const manager = new UserManager();
local.Strategy;

const InitLocalStrategy = () => {
  passport.use(
    "register",
    new local.Strategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        const { firstName, lastName, email, age } = req.body;

        const userNameExist = await manager.getUserByName(username);
        if (userNameExist) return done("Nombre de usuario ya existe");

        const userEmailExist = await manager.getUserByName(email);
        if (userEmailExist) return done("Email de usuario ya existe");

        const user = await manager.registerUser({
          firstName,
          lastName,
          username,
          email,
          age,
          password,
        });

        return done(null, user);
      }
    )
  );

  passport.use(
    "login",
    new local.Strategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        const user = await manager.loginUser(username, password);
        if (!user) return done("Nombre de usuario o contraseña incorrecta");

        return done(null, user);
      }
    )
  );

  passport.use(
    "current-user",
    new local.Strategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        return req.user;
      }
    )
  );

  passport.use(
    "loginGithub",
    new GithubStrategy(
      {
        clientID: "Iv1.f93688b575764776",
        clientSecret: "5d3fb2d20073b15c651f1ba9e0dc4888ac1d9fa6",
        callbackURL: "http://localhost:8080/api/auth/login",
      },
      async (accessToken, refreshToken, profile, done) => {
        const username = profile._json.login;
        const user = await manager.getUserByName(username);

        if (user) return done(null, user);

        const createUser = await manager.registerUser({
          firstName: profile._json.name.split(" ")[0],
          lastName: profile._json.name.split(" ")[1],
          username: username,
          email: profile._json.email,
          age: "",
          password: "",
        });
        done(null, createUser);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (_id, done) => {
    const user = await manager.getUserById(_id);
    done(null, user);
  });
};

export default InitLocalStrategy;

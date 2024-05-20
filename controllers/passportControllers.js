import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import users from "../data/users.js";

passport.use(
  new localStrategy((username, password, done) => {
    // console.log("pass username: ", username);
    // console.log("pass password: ", password); // Fix the logging to show password
    console.log("Inside the Strategy:");
    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) {
        console.error("User Not Found");
        return done(null, false, { message: "User Not Found!" });
      }
      if (findUser.password !== password) {
        console.error("Incorrect Password");
        return done(null, false, { message: "Incorrect Password!" });
      }
      return done(null, findUser);
    } catch (err) {
      return done(err, null);
    }
  })
);

// Serialize user into the session
passport.serializeUser((findUser, done) => {
  console.log("serializeUser called!");
  console.log(findUser);
  done(null, findUser.id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  console.log("Deserializing user with id:", id);
  try {
    const findUser = users.find((user) => user.id === id);
    console.log(findUser);
    done(null, findUser);
  } catch (error) {
    console.log(error.message);
  }
});

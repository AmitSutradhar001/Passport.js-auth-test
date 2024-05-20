import express from "express";
import cors from "cors";
import passport from "passport";
// import cookieParser from "cookie-parser";
import session from "express-session";
import "./controllers/passportControllers.js";

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(
  session({
    secret: "Naru",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 5,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/passport/login", passport.authenticate("local"), (req, res) => {
  res.send("Authentication Successful");
});

app.get("/passport/status", (req, res) => {
  console.log(req.session.user);
  res.send("okey!");
});

app.post("/passport/logout", (req, res) => {
  console.log("hi");
  if (!req.user) return res.status(401);
  req.logout((err) => {
    if (err) return res.status(400);
    res.send("logout successful");
  });
});

app.listen(port, () => console.log(`server is running on ${port}.`));

import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { connectDB } from "./config/database.js";
import authRoute from "./routes/AuthRoute.js";
import userRoute from "./routes/UserRoute.js";
import initializePassport from "./config/passport.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      maxAge: 3600000, 
    },
  })
);

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use(authRoute);
app.use(userRoute);

app.listen(port, () => {
  console.log("Server up and running on port", port);
});

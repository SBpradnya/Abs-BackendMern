require("dotenv").config();

const express = require("express");
const cors=require("cors");

const app = express();
const authRoute = require("./router/auth-router");
const contactRoute=require("./router/contact-router");

const  flightRoute=require("./router/flight-router")

const bookingRoutes = require("./router/booking-routes");

const connectDb = require("./utlis/db");
const errorMiddleware = require("./middlewares/error-middleware");

//handling cros issue
const corsOptions={
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE,PATCH",
 credentials:true,
};
app.use(cors(corsOptions));
// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use(express.json())

app.use("/api/auth", authRoute);

app.use("/api/form",contactRoute);

app.use('/api', flightRoute);

app.use('/api/bookings', bookingRoutes);

app.use(errorMiddleware);

const PORT = 4000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

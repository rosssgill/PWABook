import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  endpoint: String,
  keys: {
    auth: String,
    p256dh: String,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;

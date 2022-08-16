import mongoose from "mongoose";
import webpush from "web-push";
import Subscription from "../models/subscription.js";

export const createSubscription = async (req, res) => {
  const sub = req.body;

  console.log("New sub: ", sub);

  const newSubscription = new Subscription({
    ...sub,
  });

  try {
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const sendPushMessage = async (req, res) => {
  try {
    webpush.setVapidDetails(
      "mailto:rossstephensongill@gmail.com",
      "BH3ZQxUdEIciu6Kz6Tiq7udXG1LiBMgEELig2eMNQzaJnHbLv8Nd0zbgquA7XP-N6SW8gCXFQWl_9NmK2OP1BRQ", // public key
      "3YESRcm6ngaRwm2Pbay7GsfNgAmHuMR9FJ4NRAOjWPg" // private key
    );

    const query = await Subscription.find().lean();

    console.log("Query: ", query);

    for await (const sub of query) {
      console.log("sub: ", sub);
      const pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          auth: sub.keys.auth,
          p256dh: sub.keys.p256dh,
        },
      };

      console.log("Push config:", pushConfig);

      webpush
        .sendNotification(
          pushConfig,
          JSON.stringify({
            title: "New Post",
            content: "New Post Added!",
            openUrl: "/",
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }

    res.status(200).json("New push message sent successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

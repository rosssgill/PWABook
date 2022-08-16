import express, { application } from "express";
import {
  createSubscription,
  sendPushMessage,
} from "../controllers/pushMessage.js";

const router = express.Router();

router.post("/", sendPushMessage); // http://localhost:5000/push
router.post("/subscribe", createSubscription); // http://localhost:5000/push/subscribe

export default router;

const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(express.json());
app.use(cors());

// Your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
                    // Replace with your auth token
const client = twilio(accountSid, authToken);

// WhatsApp Sandbox From Number
const FROM = "whatsapp:+14155238886";

app.post("/send-birthday", async (req, res) => {
    const { phone } = req.body;

    // Birthday message
    const messageText = "🎉 Happy Birthday! 🎂 Wishing you a year full of happiness and success! 🎈";

    try {
        const msg = await client.messages.create({
            from: FROM,
            to: `whatsapp:${phone}`,
            body: messageText
        });

        console.log("Birthday message sent:", msg.sid);

        res.json({ success: true, sid: msg.sid });

    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err.message });
    }
});

app.listen(3000, () => {
    console.log("WhatsApp Birthday App server running on port 3000");
});

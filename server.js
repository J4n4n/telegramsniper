const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const botToken = "8963006945:AAGVih-yUMovlRcxI1zZoLJ6rdxW3pxe88U";
const targetUsername = "mibombaX";
const chatId = "-1003914840043";
const adminChatId = "1536070645";

app.get('/', (req, res) => {
  res.send('Fast Sniper Bot is Running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startSniper();
});

function startSniper() {
  console.log("Sniper loop started for @" + targetUsername);

  setInterval(async () => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/setChatUsername`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          username: targetUsername
        })
      });

      const data = await response.json();

      if (data.ok) {
        console.log(`SUCCESS! Username @${targetUsername} locked!`);
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: adminChatId,
            text: `🎉 موفقیت! آیدی @${targetUsername} با موفقیت قفل شد.`
          })
        });
      } else {
        console.log(`Attempt: ${data.description}`);
      }
    } catch (error) {
      console.error("Error in sniper loop:", error);
    }
  }, 2000);
}

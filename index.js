const { Client, RemoteAuth, MessageMedia } = require("whatsapp-web.js");
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const qrcode = require("qrcode-terminal");
const mime = require("mime-types");
const path = require("path");
const fs = require("fs");
// Require database
const { MongoStore } = require("wwebjs-mongo");
const mongoose = require("mongoose");
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Meme Function
const sendMeme = async (chat) => {
  try {
    const response = await axios.get("https://meme-api.com/gimme");
    const memeUrl = response.data.url;
    const memeCaption = response.data.title;

    const caption = memeCaption || "";
    const media = await MessageMedia.fromUrl(memeUrl);
    await chat.sendMessage(media, { caption });
  } catch (error) {
    console.error(error);
  }
};

// Load the session data
mongoose.connect(process.env.MONGODB_URI).then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 1000000,
    }),
  });

  // QR Code
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });
  client.on("remote_session_saved", () => {
    console.log("Remote session saved");
  });

  client.on("message", async (message) => {
    let chat = await message.getChat();

    // Group Chat
    if (chat.isGroup) {
      let grpid = chat.id._serialized;
      console.log("Group ID: " + grpid);

      if (message.body === "-sticker") {
        if (message.hasMedia) {
          message.downloadMedia().then((media) => {
            if (media) {
              const mediaPath = "./downloaded-media/";

              if (!fs.existsSync(mediaPath)) {
                fs.mkdirSync(mediaPath);
              }

              const extension = mime.extension(media.mimetype);

              const filename = new Date().getTime();

              const fullFilename = mediaPath + filename + "." + extension;

              // Save to file
              try {
                fs.writeFileSync(fullFilename, media.data, {
                  encoding: "base64",
                });
                console.log("File downloaded successfully!", fullFilename);
                console.log(fullFilename);
                MessageMedia.fromFilePath((filePath = fullFilename));

                client.sendMessage(
                  message.from,
                  new MessageMedia(media.mimetype, media.data, filename),
                  {
                    sendMediaAsSticker: true,
                  }
                );
                fs.unlinkSync(fullFilename);
                console.log(`File Deleted successfully!`);
              } catch (err) {
                console.log("Failed to save the file:", err);
                console.log(`File Deleted successfully!`);
              }
            }
          });
        } else {
          message.reply(`send image with caption *-sticker* `);
        }
      } else if (message.body === "-quote") {
        const apiData = await axios.get("https://type.fit/api/quotes");
        const randomNumber = Math.floor(Math.random() * apiData.data.length);
        message.reply(`*${apiData.data[randomNumber].text}*`);
      } else if (message.body === "-ping") {
        return message.reply("pong");
      } else if (message.body === "-meme") {
        try {
          const chat = await client.getChatById(message.from);
          await sendMeme(chat);
        } catch (err) {
          console.log(err);
        }
      } else if (message.body.startsWith("-search")) {
        try {
          const prompt = message.body.substring(8);
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `tell me ${prompt}`,
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0,
          });

          return await message.reply(
            response.data.choices[0].text.substring(2)
          );
        } catch (err) {
          await message.reply("Something went wrong");
          console.log(err);
        }
      } else if (message.body === "-ping") {
        return message.reply("pong");
      } else if (message.body === "-help") {
        return message.reply(
          "Hi, I am a bot that can help you search the internet. To use me, just type -search and then your question. For example, -search what is the capital of India?"
        );
      } else if (message.body === "-about") {
        return message.reply(
          "Hi, I am a bot that can help you search the internet. To use me, just type -search and then your question. For example, -search what is the capital of India?"
        );
      } else if (message.body === "-test") {
        return message.reply(
          "Hi, I am a bot that can help you search the internet. To use me, just type -search and then your question. For example, -search what is the capital of India?"
        );
      } else if (message.body === "-commands") {
        return message.reply(
          `-search <input>
  -meme
  -quote
  -help
  -about
  -sticker <in image caption>
  -commands
  -image <input>`
        );
      } else if (message.body.startsWith("-imagine")) {
        try {
          const prompt = message.body.substring(7);
          const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;

          const media = await MessageMedia.fromUrl(image_url);
          return await client.sendMessage(message.from, message.reply(media));
        } catch (error) {
          await message.reply("Something went wrong");
          console.log(error);
        }
      }
    }

    // Personal Chat
    if (!chat.isGroup) {
      if (message.hasMedia) {
        message.downloadMedia().then((media) => {
          if (media) {
            try {
              const mediaPath = "./downloaded-media/";

              if (!fs.existsSync(mediaPath)) {
                fs.mkdirSync(mediaPath);
              }

              const extension = mime.extension(media.mimetype);

              const filename = new Date().getTime();

              const fullFilename = mediaPath + filename + "." + extension;

              // Save to file
              try {
                fs.writeFileSync(fullFilename, media.data, {
                  encoding: "base64",
                });
                console.log("File downloaded successfully!", fullFilename);
                console.log(fullFilename);
                MessageMedia.fromFilePath((filePath = fullFilename));

                client.sendMessage(
                  message.from,
                  new MessageMedia(media.mimetype, media.data, filename),
                  {
                    sendMediaAsSticker: true,
                  }
                );
                fs.unlinkSync(fullFilename);
                console.log(`File Deleted successfully!`);
              } catch (err) {
                console.log("Failed to save the file:", err.message);
                console.log(`File Deleted successfully!`);
              }
            } catch (err) {
              console.log(err.message);
            }
          }
        });
      } else if (message.body === "-quote") {
        const apiData = await axios.get("https://type.fit/api/quotes");
        const randomNumber = Math.floor(Math.random() * apiData.data.length);
        message.reply(`*${apiData.data[randomNumber].text}*`);
      } else if (message.body === "-ping") {
        return message.reply("pong");
      } else if (message.body === "-meme") {
        try {
          const chat = await client.getChatById(message.from);
          await sendMeme(chat);
        } catch (err) {
          console.log(err);
        }
      } else if (message.body.startsWith("-search")) {
        try {
          const prompt = message.body.substring(8);
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `tell me ${prompt}`,
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0,
          });

          return await message.reply(response.data.choices[0]);
        } catch (err) {
          console.log(err);
        }
      } else if (message.body === "-ping") {
        return message.reply("pong");
      } else if (message.body === "-help") {
        return message.reply(
          "Hi, I am a bot that can help you search the internet. To use me, just type -search and then your question. For example, -search what is the capital of India?"
        );
      } else if (message.body === "-about") {
        return message.reply(
          "Hi, I am a bot that can help you search the internet. To use me, just type -search and then your question. For example, -search what is the capital of India?"
        );
      } else if (message.body === "-test") {
        return message.reply(
          "Hi, I am a bot that can help you search the internet. To use me, just type -search and then your question. For example, -search what is the capital of India?"
        );
      } else if (message.body === "-commands") {
        return message.reply(
          `-search <input>
  -meme
  -quote
  -help
  -about
  -sticker <in image caption>
  -commands
  -imagine <input>`
        );
      } else if (message.body.startsWith("-imagine")) {
        try {
          const prompt = message.body.substring(7);
          const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;

          const media = await MessageMedia.fromUrl(image_url);
          return await client.sendMessage(message.from, message.reply(media));
        } catch (error) {
          await message.reply("Something went wrong");
          console.log(error);
        }
      } else if (
        !message.body === "-sticker" ||
        !message.body === "-quote" ||
        !message.body === "-ping" ||
        !message.body === "-help" ||
        !message.body === "-about" ||
        !message.body === "-test" ||
        !message.body === "-commands" ||
        !message.body.startsWith("-imagine")
      ) {
        try {
          const prompt = message.body;
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0,
          });
          return await message.reply(response.data.choices[0].text);
        } catch (err) {
          await message.reply("Something went wrong");
          console.log(err);
        }
      }
    }
  });

  client.initialize();
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

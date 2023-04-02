# WhatsApp Bot with ChaGPT🔥, DALLE-2⚡,Meme Generation, and Image-to-Sticker Conversion

This is a Node.js-based chatbot built using the whatsapp-web.js library that allows users to search the internet, get quotes, and create stickers from images. The chatbot can be used on any WhatsApp-enabled device.

## Features

- DALLE-2: The bot can generate images using DALLE-2 neural network.
- Meme Generation: The bot can generate memes on the fly using popular templates and user-provided captions.
- Image-to-Sticker Conversion: Users can upload images to the bot, which will then convert them to high-quality stickers that can be shared in chats.
- Multi-Feature Bot: The bot combines all of these features into a single, powerful package that can enhance any WhatsApp group or chat.
- Search the internet for any topic or question using `-search`
- Get random quotes using `-quote`
- Create stickers from images using `-sticker`
- Get a random meme using `-meme`
- Get help using `-help`
- Get information about the chatbot using `-about`

## Installation

1. Clone the repository
2. Install the required packages by running `npm install`
3. Create a `.env` file with the following keys:
   - `MONGODB_URI`: MongoDB connection string
   - `API_KEY`: OpenAI API key
4. Run `npm start` to start the chatbot

### Create .env File:

```sh
API_KEY=<YOUR OPENAI KEY>
MONGODB_URI=<YOUR DATABASE URL>
```

## Usage

1. Save the chatbot's phone number in your contacts
2. Scan the QR code that is displayed in the console using your WhatsApp app
3. Send a message to the chatbot to start using it

## Dependencies

- `whatsapp-web.js` for the WhatsApp API
- `dotenv` for environment variables
- `axios` for making API requests
- `qrcode-terminal` for displaying the QR code
- `mime-types` for getting the file extension of media files
- `path` and `fs` for handling files
- `openai` for the search functionality
- `wwebjs-mongo` and `mongoose` for the database

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.

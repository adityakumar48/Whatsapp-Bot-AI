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

Thank you for your interest in contributing to this project! As an open-source project, we welcome contributions from anyone. By contributing to this project, you are agreeing to abide by the Code of Conduct.

## Getting Started
1. Fork the repository
2. Clone the repository to your local machine
3. Install the necessary dependencies by running `npm install`
4. Create a new branch for your changes using `git checkout -b feature/your-feature-name`
5. Make your changes and commit them with a descriptive commit message
6. Push your changes to your forked repository
7. Create a pull request to the main repository's develop branch

## Issues
If you notice a bug or want to request a new feature, please create an issue on the GitHub repository. Please include as much detail as possible, including how to reproduce the issue and any error messages that you encounter.

## Pull Requests
When submitting a pull request, please ensure that your changes:
- Follow the existing coding style
- Include tests for any new functionality
- Include documentation updates as necessary

Please also make sure that your code builds and passes the existing tests.

## Code of Conduct
Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing to this project.

## License
By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## License

This project is licensed under the MIT License.

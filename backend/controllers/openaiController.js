const dotenv = require("dotenv");
dotenv.config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const { choices } = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Use GPT-3.5 Turbo
      messages: [{ role: "user", content: `Summarize this \n${text}` }],
    });
    if (choices) {
      return res.status(200).json(choices[0].message.content);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const { choices } = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Use GPT-3.5 Turbo
      messages: [{ role: "user", content: `Write a detailed paragraph about \n${text}` }],
    });
    if (choices) {
      return res.status(200).json(choices[0].message.content);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { choices } = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Use GPT-3.5 Turbo
      messages: [
        { role: "user", content: `Answer question similar to how Yoda from Star Wars would. Me: 'What is your name?' Yoda: 'Yoda is my name' Me: ${text}` },
      ],
    });
    if (choices) {
      return res.status(200).json(choices[0].message.content);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { choices } = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Use GPT-3.5 Turbo
      messages: [{ role: "user", content: `Convert these instructions into JavaScript code \n${text}` }],
    });
    if (choices) {
      return res.status(200).json(choices[0].message.content);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.images.create({
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      return res.status(200).json(data[0].url);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

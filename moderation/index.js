const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const handleEvent = async (type, data) => {
  if (type == "CommentCreated") {
    const { content, id, postId } = data;

    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4003, async () => {
  console.log("Listening on port 4003");

  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    console.log("Processing event:", event.type);

    handleEvent(event.type, event.data);
  }
});

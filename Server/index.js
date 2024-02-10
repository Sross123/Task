const express = require("express");
const cors = require("cors");
const app = express();
const AddressModal = require("./model/modal");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    let user = await AddressModal.find();
    user.length > 0
      ? res.send(user)
      : res.send({ result: "No Products Found" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Add address

app.post("/address", async (req, res) => {
  try {
    let user = new AddressModal(req.body);
    let result = await user.save();
    // console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Delete
app.delete("/address/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await AddressModal.deleteOne({ _id: id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Search

app.put("/search/:key", async (req, res) => {
  // const {key} = req.params;
  try {
    let result = await AddressModal.find({
      $or: [
        { name: { $regex: req.params.key } },
        { location: { $regex: req.params.key } },
        { pincode: { $regex: req.params.key } },
      ],
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Update Address

app.get("/address/:id", async (req, res) => {
  try {
    // const { id } = ;
    const task = await AddressModal.findOne({ _id: req.params.id });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

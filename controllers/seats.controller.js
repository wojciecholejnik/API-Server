const Seats = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Seats.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seats.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Seats.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { client, seat, email, day } = req.body;
    const newSeats = new Seats({ client: client, seat: seat, email: email, day: day, });
    await newSeats.save();
    req.io.emit('seatsUpdated', await Seats.find({}));
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { client, seat, email, day } = req.body;
  try {
    const dep = await(Seats.findById(req.params.id));
    if(dep) {
      await Seats.updateOne({ _id: req.params.id }, { $set: { client: client, seat: seat, email: email, day: day, }});
      const edited = await(Seats.findById(req.params.id));
      res.json(edited);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await(Seats.findById(req.params.id));
    if(dep) {
      await Seats.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
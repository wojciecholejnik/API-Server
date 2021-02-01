const Concerts = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Concerts.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const dep = await Concerts.find({performer: req.params.performer});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const dep = await Concerts.find({genre: req.params.genre});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const dep = await Concerts.find({price: {$gte: req.params.price_min, $lte: req.params.price_max}});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const dep = await Concerts.find({day: req.params.day});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concerts.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Concerts.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day } = req.body;
    const newConcerts = new Concerts({ performer: performer, genre: genre, price: price, day: day, });
    await newConcerts.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day } = req.body;
  try {
    const dep = await(Concerts.findById(req.params.id));
    if(dep) {
      await Concerts.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, }});
      const edited = await(Concerts.findById(req.params.id));
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
    const dep = await(Concerts.findById(req.params.id));
    if(dep) {
      await Concerts.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
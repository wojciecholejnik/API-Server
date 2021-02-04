const Testimonials = require('../models/testimonials.model');
var sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Testimonials.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Testimonials.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { author, text } = sanitize(req.body);
  try {
    const cleanAuthor = sanitize(author);
    const clarText = sanitize(text);
    const newTestimonials = new Testimonials({ author: cleanAuthor, text: clarText });
    await newTestimonials.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;
  try {
    const dep = await(Testimonials.findById(req.params.id));
    if(dep) {
      await Testimonials.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
      const edited = await(Testimonials.findById(req.params.id));
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
    const dep = await(Testimonials.findById(req.params.id));
    if(dep) {
      await Testimonials.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
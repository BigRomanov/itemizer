var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/itemizer');

var Schema = mongoose.Schema;  


var ItemSchema = new Schema({
  title: String
});

var ChecklistSchema = new Schema({
  title: String, 
  items: [ItemSchema]
});

var Checklist = mongoose.model('Checklist', ChecklistSchema);
var Item = mongoose.model('Item', ItemSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Itemizer' });
});

// API /////////////////////////////////////////////
// Checklist API
router.get('/api/checklists', function (req, res){
  return Checklist.find(function (err, checklists) {
    if (!err) {
      return res.send(checklists);
    } else {
      return console.log(err);
    }
  });
});

router.post('/api/checklists', function (req, res){
  var product;
  console.log("POST: ");
  console.log(req.body);
  checklist = new Checklist({
    title: req.body.title,
    steps: req.body.steps
  });
  checklist.save(function (err) {
    if (!err) {
      return console.log("New check list created", checklist.title);
    } else {
      return console.log(err);
    }
  });
  return res.send(product);
});


router.get('/api/checklists/:id', function (req, res){
  return Checklist.findById(req.params.id, function (err, checklist) {
    if (!err) {
      return res.send(checklist);
    } else {
      return console.log(err);
    }
  });
});

router.put('/api/checklists/:id', function (req, res){
  return Checklist.findById(req.params.id, function (err, checklist) {
    checklist.title = req.body.title;
    checklist.items = req.body.items;
    return checklist.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});

router.delete('/api/checklists/:id', function (req, res){
  return Checklist.findById(req.params.id, function (err, checklist) {
    return checklist.remove(function (err) {
      if (!err) {
        console.log("Checklist deleted");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// API /////////////////////////////////////////////

module.exports = router;

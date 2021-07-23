const router = require("express").Router();
const Item = require("./items-model.js");



router.get('/', (req, res) => {
    Item.find(req.query)
        .then(items => {
            res.status(200).json(items);
        })
        .catch(error => {
            res.status(500).json({
            message: 'Error retrieving the items',
            });
      });
}); // return an array of all items - THIS WORKS
  


router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
        })
        .catch(error => {
        res.status(500).json({
            message: 'Error retrieving the item',
        });
    });
});  // return the item object with the matching id (working)
  

  
  router.post('/', (req, res) => {
    Item.add(req.body)
      .then(item => {
            res.status(201).json(item);
      })
      .catch(error => {
            res.status(500).json({
            message: 'Error adding the item',
            });
      });
  }); // return the added item object
  
  router.delete('/:id', (req, res) => {

    Item.remove(req.params.id)
      .then(count => {
            if (count > 0) {
            res.status(200).json({ message: 'The item has been deleted' });
            } else {
            res.status(404).json({ message: 'The item could not be found' });
            }
      })
      .catch(error => {
            res.status(500).json({
            message: 'Error removing the item',
            });
      });
  }); // returns delete message
  
  router.put('/:id', (req, res) => {

    const changes = req.body;
    
    Item.update(req.params.id, changes)
      .then(item => {
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(404).json({ message: 'The item could not be found' });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error updating the item',
        });
      });
  }); // returns item object
  
  module.exports = router
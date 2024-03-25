const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const catData = await Category.findAll();
    res.status(200).json(catData);
  }catch {
    res.status(500).json(err);
  }
  
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const catData = await Category.findByPk(req.params.id);
    if(!catData){
      res.status(404).json(console.error());
    }res.status(200).json(catData);
  }catch(err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }catch (err){
    res.status(500).json(err)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
   const categoryData = await Category.update(req.body,{
    where:{
      id:req.params.id,
    }
   })
   res.status(200).json(categoryData);
  }catch (err){
  res.staus(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
   const categoryData = await Category.destroy({
    where:{
      id: req.params.id,
    },
   });
   if (!categoryData) {
    res.status(404).json({ message: 'No user with this id!' });
    return;
  }
   res.status(200).json(categoryData);
  }catch (err){
   res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;

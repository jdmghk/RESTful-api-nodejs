const express = require('express');
const router = express.Router();
const Post = require('../models/post');


//GETS BACK ALL THE POSTS
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message:err});
    }
});

//SUBMITS A POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    const savedPost = await post.save()
    res.json(savedPost);
    }catch (err) {
        res.json({ message: err });
    }
});

//SPECIFIC POST
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
});


//DELETE POST
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        if (removedPost.deletedCount === 0){
            return res.status(404).json({ message: "Post not found"});
        }
        res.json({ message: "Post deleted successfully" });
    } catch(err) {
        res.status(500).json({message: err});
    }
});

//UPDATE A POST
router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    }catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
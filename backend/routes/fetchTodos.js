const router = require("express").Router();
router.get('/user',(req,res)=>{
    console.log(req.user)
    res.send(req.user)
})
router.get('/:id',(req,res)=>{
    // req.params.id === googleID
})

module.exports=router
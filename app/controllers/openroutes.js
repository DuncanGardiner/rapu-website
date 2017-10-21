const router = require('express').Router();

//Home Page
router.get(['/', '/home'], (req, res) =>{
    res.render('website/index');
});

//About Page
router.get('/about', (req, res) =>{
    res.render('about');
});

//Services Page
router.get('/services', (req, res) =>{
    res.render('services');
});

//contact Page
// router.get('/contact', (req, res) =>{
//     res.render('#contactModal');
// });

router.get('/contactModal', (req,res, next) =>{
    res.render('#contactModal', {user: req.user});
});





module.exports = router;
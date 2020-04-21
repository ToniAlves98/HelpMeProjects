console.log('routes.js');

var express = require('express');
var router = express.Router();

/* Get home page */
router.get('/', function(req, res, next){
    console.log('/');
    res.render('index', {title: 'Form Validation', success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
});

router.post('/submit', function(req, res, next){
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min:4});

    var errors = req.validationErrors();
    if(errors){
        console.log('routes error');
        req.session.erros = errors;
        req.session.success = false;
    } else {
        console.log('routes success');
        req.session.success = true;
    }
    res.redirect('/');
});

module.exports = router;
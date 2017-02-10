var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/',function(req,res){
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXxxrequesting index fileXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx');
  res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\index.html');
})





module.exports = router;

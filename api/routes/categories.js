const express = require('express');
const router = express.Router();

const isAuthhenticated = true;
router.all('*',(req,res,next)=>  {
    if(isAuthhenticated) {
        next();
    } else {
        res.json({success: false, error: "Not Authhenticated"})
    }
})

router.get('/', (req, res) => {
  res.json({ success: true });
});

// DOĞRU EXPORT:
module.exports = router;
let { Router } = require('express');
let router = new Router();

router.get('/', (req, res, next) => {
  res.json({ 'hello': 'hel' });
})

module.exports = router;
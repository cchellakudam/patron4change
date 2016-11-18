import express from 'express';
var router = express.Router();


router.get('/', (req,res) => {
	res.send(JSON.stringify([]));
});

router.get('/:username', (req,res) => {
	var username = req.params.username;
	res.send(JSON.stringify({}));
});

module.exports = router;

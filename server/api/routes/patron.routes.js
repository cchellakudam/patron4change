import express from 'express';
const router = express.Router();

// patron specific stuff

router.get('/', (req,res) => {
	res.send(JSON.stringify([]));
});

router.get('/:username', (req,res) => {
	res.send(JSON.stringify({}));
});

module.exports = router;

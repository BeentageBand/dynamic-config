const {Router} = require('express');
const dal = require('../dal/dal');
const router = Router();

router.post('/', async (req, res, next) => {
    try {
        console.log('Hit post /api/ with' + req.body);

        const item = dal.insert(req.body);
        console.log(item);

        res.json({
            guid: `${item['$loki']}`,
        });
    } catch (error) {
        if ('ValidateError' === error.name) {
            res.status(422);
        }
        next(error);
    }
});

router.get('/:guid', async (req, res, next) =>{
    let {guid} = req.params;
    try {
        const item = dal.findOne({'$loki': `guid`})
        if (undefined == item) res.json();
        else res.json(item);

    } catch (error) {
        next(error);
    }
});

router.post('/:guid', async (req, res, next) =>{
    let {guid} = req.params;
    try {
        res.json(`post /${guid}`);
    } catch (error) {
        next(error);
    }
});

router.get('/:guid/:keypath', async (req, res, next) => {
    let {keypath, guid} = req.params;
    try {
        res.json(`post /${guid}/${keypath}`);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
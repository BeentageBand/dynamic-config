const { Router } = require('express');
const dal = require('../dal/dal');
const router = Router();

router.post('/', async (req, res, next) => {
    try {
        console.log('Hit post /api/ with' + req.body);

        const item = dal.insert(req.body);
        console.log(item);

        res.status(201);
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

router.get('/:guid', async (req, res, next) => {
    const { guid } = req.params;
    try {
        const item = dal.get(guid);
        console.log(item.$loki);

        if (undefined == item) res.json();
        else res.json(item);

    } catch (error) {
        next(error);
    }
});

router.get('/:guid/:keypath', async (req, res, next) => {
    const { keypath, guid } = req.params;
    try {
        let item = dal.get(guid);
        keypath.split('.')
            .forEach((key) => item = item[key]);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
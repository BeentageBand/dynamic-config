const { Router } = require('express');
const dal = require('../dal/dal');
const router = Router();

const validateItemFound = (item, message) => {
    if (undefined == item) {
        throw new function () {
            this.name = 'NotFound';
            this.message = message;
        };
    }
};

const validateBodyNotEmpty = (body) => {
    if (Object.keys(body).length === 0) {
        throw new function(){
            this.name ='BadRequest';
            this.message = 'Request body should not be empty';
        };
    }
};

const handleBadRequest = (res, error) => {
    if ('NotFound' === error.name) {
        res.status(404);
    }
    if ('TypeError' === error.name) {
        res.status(400);
    }
    if ('BadRequest' === error.name) {
        res.status(400);
    }
}

router.post('/', async (req, res, next) => {
    try {
        validateBodyNotEmpty(req.body);
        const item = dal.insert(req.body);
        res.status(201);
        res.json({
            guid: `${item.$loki}`,
        });
    } catch (error) {
        handleBadRequest(res, error);
        next(error);
    }
});

router.get('/:guid', async (req, res, next) => {
    const { guid } = req.params;
    try {
        const item = dal.get(guid);
        validateItemFound(item, `Config ${guid} does not exist.`);
        res.json(item);
    } catch (error) {
        handleBadRequest(res, error);
        next(error);
    }
});

router.get('/:guid/:keypath', async (req, res, next) => {
    const { keypath, guid } = req.params;
    try {
        let item = dal.get(guid);
        validateItemFound(item, `Config ${guid} does not exist.`);
        keypath.split('.')
            .forEach((key) => {
                item = item[key];
                validateItemFound(item, `Keypath ${keypath} does not exist in config ${guid}`);
            });
        res.json({[keypath]: item});
    } catch (error) {
        handleBadRequest(res, error);
        next(error);
    }
});

module.exports = router;
const express = require("express"); 
const router = express.Router(); 

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Volcano API!'});
});

router.get('/volcanoes', async (req, res) => {
    try {
        const volcanoes = await req.db('data').select('*');
        res.json(volcanoes);
    } catch (error) {
        console.log(error)
    }
});

router.get('/volcanoes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const volcano = await req.db('data').where({ id }).first();
        if (volcano) {
            res.json(volcano);
        } else {
            res.status(404).json({error: "Volcano not found" });
        } 
    } catch (error) {
        console.log(error);
    }
})

router.get('/countries', async (req, res) => {
    try {
        const countries = await req.db('data').distinct('country').orderBy('country', 'asc');
        const countrylist = countries.map(country => country.country);
        res.json(countrylist)
    } catch(error) {
        console.log(error);
    }
})

module.exports = router; 

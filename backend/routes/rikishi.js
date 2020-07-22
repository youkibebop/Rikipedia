const router = require('express').Router();
let Rikishi = require('../models/rikishi.model');

router.route('/').get((req, res) => {
    Rikishi.find()
        .then(sumo => res.json(sumo))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/Makuuchi').get((req, res) => {
    Rikishi.find({division: 'Makuuchi'})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const kanji = req.body.kanji;
    const division = req.body.division;
    const rank = req.body.rank;
    const rank2 = req.body.rank2;
    const rankId = Number(req.body.rankId);
    const stable = req.body.stable;
    const dob = Date(req.body.dob);
    const debutDate = Date(req.body.debutDate);
    const birthplace = req.body.birthplace;
    const height = Number(req.body.height);
    const weight = Number(req.body.weight);
    const favouriteTechnique = req.body.favouriteTechnique;
    
    const rikishi = new Rikishi({
        name, kanji, division, rank, rank2, rankId, stable, dob, debutDate, birthplace, height, weight, favouriteTechnique,
    });

    rikishi.save()
        .then(() => res.json('New Sumo Profile added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/:id').get((req, res) => {
    Rikishi.findById(req.params.id)
        .then(sumo => res.json(sumo))
        .catch(err => res.status(400).json('Error: ' + err));
    });
  
router.route('/:id').delete((req, res) => {
    Rikishi.findByIdAndDelete(req.params.id)
        .then(() => res.json('Sumo Profile deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
  
router.route('/update/:id').post((req, res) => {
    Rikishi.findById(req.params.id)
        .then(sumo => {
        sumo.name = req.body.name;
        sumo.kanji = req.body.kanji;
        sumo.division = req.body.division;
        sumo.rank = req.body.rank;
        sumo.rank2 = req.body.rank2;
        sumo.rankId = Number(req.body.rankId);
        sumo.stable = req.body.stable;
        sumo.dob = Date(req.body.dob);
        sumo.debutDate = Date(req.body.debutDate);
        sumo.birthplace = req.body.birthplace;
        sumo.height = Number(req.body.height);
        sumo.weight = Number(req.body.weight);
        sumo.favouriteTechnique = req.body.favouriteTechnique;

        sumo.save()
            .then(() => res.json('Sumo Profile updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
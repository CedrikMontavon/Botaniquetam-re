var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM plants', function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                res.send(rows);
            });
        });
    });
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT plants.Id as plantId, plants.Name as plantName, plants.Description as plantDesc, plants.Coordinates as plantCoord, plants.PillarId as plantPillarId, images.Id as imageId FROM plants, images WHERE images.PlantId = plants.Id AND plants.Id = ' + id, function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No plants with this Id have been found");
                }
            });
        });
    });
});

router.get('/:id/coordinates', function(req, res, next) {
    var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT plants.Coordinates FROM plants WHERE plants.Id = ' + id, function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No plants with this Id have been found");
                }
            });
        });
    });
});

module.exports = router;
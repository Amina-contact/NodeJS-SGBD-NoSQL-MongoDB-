const express = require('express');
//const { json } = require('express/lib/response');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/:page?', async function(req, res, next) {
    const limit = parseInt(req.query.take) || 10;
    const offset = parseInt(req.query.skip) || 0;
    const total= await prisma.movies.count();

    const movies = await prisma.movies.findMany({
        take: limit,
        skip: offset,
    })

    res.send({
        data: movies,
        pagination: {
            count: total,
            skip: limit,
            take: offset,
        }
    });
  });
module.exports = router;

/*const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res, next) {
    const movies = await prisma.movies.findMany({take: 10})
       res.send(movies);
    });
module.exports = router;*/



/*var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();


   
    const moviesJson =  require("./movies.json"); // path of your json file;
    
    router.get('/', function (req, res, next) {
        console.log(moviesJson.type)
        for (var car of moviesJson) 
        {
            res.send(moviesJson)
        }
    });
module.exports = router;*/
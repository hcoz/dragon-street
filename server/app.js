const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/contract-meta', function (req, res, next) {
    res.json({
        name: 'Dragon Street',
        description: 'Dragon Street creatures for fun.',
        image: 'https://dragonstreetnft.com/dragonstreet.png',
        external_link: 'https://dragonstreetnft.com'
    });

    next();
});

app.get('/api/dragon/:tokenId', function (req, res, next) {
    const fs = require('fs');
    const path = require('path');
    const tokenId = req.params.tokenId;

    try {
        const filePath = path.resolve('./meta/dragons.json');
        const metaFile = fs.readFileSync(filePath);
        const dragons = JSON.parse(metaFile);
        let newborn;
        let len = dragons.length;
        let i = 0;
        for (;i < len; i++) {
            if (!dragons[i].isSold) {
                newborn = dragons[i];
                break;
            }
        }

        if (newborn && newborn.url) {
            // update meta file
            dragons[i].tokenId = tokenId;
            dragons[i].isSold = true;
            fs.writeFileSync(filePath, JSON.stringify(dragons));

            res.redirect(newborn.url);
        } else {
            throw Error('cannot find a newborn dragon');
        }
    } catch (error) {
        console.log('error: ', error);
        res.json({
            success: false,
            message: error.message
        });
    }

    next();
});

app.get('/api/contract', function (req, res, next) {
    if (process.env.MINT_AVAILABLE !== 'true') {
        next();
        return;
    }
    const fs = require('fs');
    const path = require('path');

    try {
        const filePath = path.resolve('./build/contracts/DragonStreetNFT.json');
        const contractFile = fs.readFileSync(filePath);

        res.json({
            success: true,
            data: contractFile
        });
    } catch (error) {
        console.log('error: ', error);
        res.json({
            success: false,
            message: error.message
        });
    }

    next();
});

app.post('/api/mint-nft', async function (req, res, next) {
    const receiver = req.body.receiver;

    if (!receiver) {
        res.json({
            success: false
        });
        next();
        return;
    }

    try {
        const mintNft = require('./mint.js');
        const transactionHash = await mintNft(receiver);

        if (!transactionHash) {
            throw Error('no transactionHash');
        }

        res.json({
            success: true,
            transactionHash: transactionHash
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }

    next();
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

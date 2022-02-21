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

app.get('/api/dragon/:txHash', function (req, res, next) {
    const fs = require('fs');
    const path = require('path');
    const txHash = req.params.txHash;
    console.log('txHash: ', txHash);

    try {
        const filePath = path.resolve('./meta/dragons.json');
        const metaFile = fs.readFileSync(filePath);
        const dragons = JSON.parse(metaFile);
        // TODO: return related metadata URL by txHash
        const url = dragons.list[0].url;
        const data = {
            [txHash]: url
        };
        console.log('data:', JSON.stringify(data));
        res.redirect(url);
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
    console.log('typeof MINT_AVAILABLE: ', typeof  process.env.MINT_AVAILABLE);
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
            throw Error();
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

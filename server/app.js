const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/api/dragon/:txHash', function (req, res, next) {
    const fs = require('fs');
    const path = require('path');
    const txHash = req.params.txHash;

    try {
        const filePath = path.resolve('./meta/dragons.json');
        const metaFile = fs.readFileSync(filePath);
        const dragons = JSON.parse(metaFile);
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

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

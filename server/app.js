const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}

app.use(express.static('dist'));

app.get('/api/dragon/:txHash', function (req, res, next) {
    const fs = require('fs');
    const txHash = req.params.txHash;

    try {
        const metaFile = fs.readFileSync(`${process.env.PWD}\\meta\\dragons.json`);
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

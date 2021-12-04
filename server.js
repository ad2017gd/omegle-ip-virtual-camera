
const express = require('express')
const app = express()
const fetch = require('fetch')
const fs = require('fs');

app.get('/:ip', (req, res) => {
    fetch.fetchUrl(`http://ip-api.com/json/${req.params.ip}`, function (error, meta, body) {
        let data = JSON.parse(body.toString());
        delete data.status;
        data.ip = data.query;
        delete data.query;
        fs.writeFileSync("ipdata.txt", Object.keys(data).map(x=>`${x.toUpperCase()} : ${data[x]}`).join("\n"));
        res.send("OK");
    });
})

app.listen(1288, () => {
    console.log(`Server running.`)
})

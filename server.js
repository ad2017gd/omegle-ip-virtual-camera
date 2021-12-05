
const express = require('express')
const app = express()
const fetch = require('fetch')
const fs = require('fs');

app.get('/:ip', (req, res) => {
    fetch.fetchUrl(`http://ip-api.com/json/${req.params.ip}`, function (error, meta, body) {
        let data = JSON.parse(body.toString());
        delete data.status;
        delete data.countryCode;
        data.region = data.regionName;
        delete data.timezone;
        delete data.org;
        delete data.as;
        data.ip = data.query;
        delete data.regionName;
        delete data.query;
        data.isp = data.isp.substring(0,16);
        fs.writeFileSync("ipdata.txt", Object.keys(data).map(x=>`${x.toUpperCase()} : ${data[x]}`).join("\n"));
        res.send("OK");
    });
})

app.listen(1288, () => {
    console.log(`Server running.`)
})

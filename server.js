
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
        data.local = req.query.local;
        fs.writeFileSync("ipdata.txt", Object.keys(data).map(x=>`${x.toUpperCase()} : ${data[x]}`).join("\n"));
        let day = Math.floor(1+Math.random()*30);
        let month = Math.floor(Math.random()*12);
        let year = Math.floor(2022+Math.random()*4);
        fs.writeFileSync("fatality_chinese.txt", `您將於 ${year} 年 ${month+1} 月 ${day} 日被處決 `)
        fs.writeFileSync("fatality_english.txt", `You will be executed on ${day} ${["January","February","March","April","May","June","July","August","September","October", "November", "December"][month]}, ${year} `)
        res.send("OK");
    });
})

app.listen(1288, () => {
    console.log(`Server running.`)
})

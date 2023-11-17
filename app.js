const express = require('express')
const app = express()
const axios = require('axios');
app.set('views', __dirname)
app.set('view engine', 'ejs')
const link = 'https://www.vedomosti.ru/rss/rubric/'
app.listen(3000, () => console.log("Server started! :3000"))
app.use(express.static(__dirname + '/public'));
app.get('/:count/for/:choice', (req, res) =>{
    let count = req.params.count
    let choice = req.params.choice


    let config = {
    method: 'get',
    url: `https://api.rss2json.com/v1/api.json?rss_url=${link + choice}`

    };

    axios.request(config)
    .then((response) => {
        let data  = response.data
        // console.log(JSON.stringify(response.data.items))
        res.render('news', {category: data.items[0]["categories"][0], items: (data.items).slice(0, count), count: count})


    // console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
    console.log(error);
    });


})


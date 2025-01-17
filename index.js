
const express  = require('express');
const axios = require('axios')
const cheerio = require('cheerio')

const app = express();
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server running on Port ${PORT}`)
})

const newspapers = [
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/',
        base: ''
    },
    {
        name: "The guardian",
        address:"https://www.theguardian.com/environment/climate-crisis",
        base:""
    },
    {
        name: "Daily Times",
        address:"https://www.thetimes.com/uk/environment/climate-change",
        base:""
    },
    {
        name: "telegraph",
        address:"https://www.telegraph.co.uk/climate-change",
        base:"https://www.telegrah.co.uk/climate-change"
    }
    ,{
        name:"Skynews",
        address:"https://news.sky.com/topic/climate-change-6161",
        base:""
    },
    {
        name: "BBC",
        address:"https://www.bbc.co.uk/news/topics/cmj34zmwm1zt",
        base:""
    },
    // {
    //     name:"channels",
    //     address:"https://www.channelstv.com/category/environment/"
    // },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au',
    },
]


const articles = []

newspapers.forEach(newspapr =>{
    axios.get(newspapr.address).then((response =>{
        const html = response.data
       const $  = cheerio.load(html)

       $('a:contains("climate")', html).each(function (){
        const title = $(this).text()
        const url = $(this).attr('href')

        articles.push({
            title,url,
            source:newspapr.name
        })
       })

    }))
})
app.get ("/shopping",(req, res)=>{
    res.json("Welcome to my Shopping news Api")
   // res.send('Hello World')
})

app.get("/news", (req, res)=>{
    res.json(articles)
        
    // axios.get("https://www.theguardian.com/environment/climate-crisis"
    //     ).then((response)=>{
    //     const html = response.data
    //     console.log(html)
    //    const $  = cheerio.load(html)

    //    $('a:contains("climate")', html).each(function (){
    //     const title = $(this).text()
    //     const url = $(this).attr('href')
    //     articles.push({
    //         title, url
    //     })

    //    })
    //    res.json(articles)}).catch(err=> console.log(err))
    //     //console.log(html)
    })

    app.get("/news/:newspaperId", (req, res)=>{
        const newspaperId = req.params.newspaperId
        const newspaperBase = newspapers.filter(newspapr => newspapr.name == newspaperId)[0].base
        const newspaperAddress = newspapers.filter(newspapr => newspapr.name ==newspaperId)[0].address
        console.log(newspaperAddress)
        //axios.get()

        axios.get(newspaperAddress)
        .then(response =>{
            const html = response.data
           const $=  cheerio.load(html)

           const specificArticles = []


           $('a:contains("climate")', html).each(function (){

           const newsTitle =  $(this).text()
            const newsUrl = $(this).attr('href')

            specificArticles.push({
                newsTitle,
                newsUrl:newspaperBase + newsUrl,
                source: newspaperId
            })
            
        })
        res.json(specificArticles)

        }).catch(err=>console.log(err))

        
    })
// app.post()
// app.delete()
// app.put()
// app.use()
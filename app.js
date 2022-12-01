const express = require('express')
const bodyParser = require('body-parser')

const app = express()

var items = ['Get a job']
var workItems = []
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res)=>{
    var calendar = new Date()

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',

    }

    var day = calendar.toLocaleDateString("en-US", options)
    
    res.render('list', {listTitle: day, newListItems: items})
})

app.post('/', (req, res)=>{
    let item = req.body.newItem


    if(req.body.list === 'Work'){
        workItems.push(item)
        res.redirect('/work')
    }
    else{
        items.push(item)
        res.redirect('/')
    }
    console.log(item);
})

app.get('/work', (req, res)=>{
    res.render('list', {listTitle: 'Work List', newListItems: workItems})
})

app.listen(3000, ()=>{
    console.log('Server port: 3000');
})

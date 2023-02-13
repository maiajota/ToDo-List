const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const date = require(__dirname + '/date.js')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

//!MONGOOSE CONNECTION
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://MaiaJota:admin123@cluster0.l7ut46v.mongodb.net/todo-listDB', {useNewUrlParser: true})

const itemsSchema = new mongoose.Schema({
    name: String,
    tutorial: Boolean
})

const Item = mongoose.model('Item', itemsSchema) //const MODEL = mongoose.model('COLLECTION', SCHEMA)

//TUTORIAL ITEMS
const tutorialItem1 = new Item({
    name: 'Welcome to your ToDo List!',
    tutorial: 1
})

const tutorialItem2 = new Item({
    name: 'Click in the + button to add a new item',
    tutorial: 1
})

const tutorialItem3 = new Item({
    name: '← Click here to delete an item',
    tutorial: 1
})

const tutorialItemList = [tutorialItem1, tutorialItem2, tutorialItem3]

app.get('/', (req, res)=>{

    const day = date()

    Item.find({}, function(err, foundItems){ //Will search all the data in the collection
        if(foundItems.length === 0){ //If it's empty, the tutorialItemList will appear
            Item.insertMany(tutorialItemList, function(err){
                if(!err){
                    console.log('Successfully saved');
                }
            })
            res.redirect('/')
        }else{ //If there's a new item, the tutorialItemList will be removed
            Item.deleteMany({tutorial: true}, function(err){
                if(err){
                    console.log(err)
                }
            })
            res.render('list', {listTitle: day, newListItems: foundItems})
        }
    })
})

app.post('/', (req, res)=>{
    const itemName = req.body.newItem

    const item = new Item({
        name: itemName
    })

    item.save()
    res.redirect('/')
})

app.post('/delete', (req, res)=>{
    const checkedItemId = req.body.checkbox
    
    Item.findByIdAndRemove(checkedItemId, (err)=>{
        if(!err){
            console.log('Successfully deleted')
            res.redirect('/')
        }
    })
})
app.listen(3000, ()=>{
    console.log('Server port: 3000');
})

const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

//Mongoose SetUp

mongoose.connect(process.env.DATABASE ,{useUnifiedTopology : true , useNewUrlParser : true,useCreateIndex: true})

const db = mongoose.connection

db.on('error',error => console.error(error))
db.once('open',()=>{console.log('Database is connected')})

const Team = require('./models/team')

async function create(){
    const team = new Team({
        name:"Everton"
    })

    try {
        if(!team){
            console.error("Please enter proper data")
        }
    
        await team.save()
        console.log(team);
        
    } catch (error) {
        console.error(error);
    }
    
   
}

create()

async function read(){
    try {
        const team =  await Team.find({'country':'England'})
        //const team =  await Team.find({})
        console.log(team);
        
    } catch (error) {
        console.error(error);
    } 
}

read()

async function update(){
    try {
        const team =  await Team.findOneAndUpdate({'name':'Liverpool'},{'country':'Germany'},{new:true, runValidators:true})
        if(!team){
            return console.log("Such Team do not exists in the DB");
        }
        console.log(team);
        
    } catch (error) {
        console.error(error);
    } 
}

update()

async function deleteDoc(){
    try {
        const team =  await Team.findByIdAndDelete('604987c55e7b257c587dbacb')
        if(!team){
            return console.log("Such Team do not exists in the DB");
        }
        console.log(team);
        
    } catch (error) {
        console.error(error);
    } 
}

deleteDoc()


const Player = require('./models/players')

//Create Player

async function createPlayer(){
    const player = new Player({
        name:"Firmino",
        team: "60486508edcb7444f471c55e"
    })

    try {
        if(!player){
            console.error("Please enter proper data")
        }
        await player.save()
        await player.populate('team').execPopulate()
        console.log(player);
        
    } catch (error) {
        console.error(error);
    }   
}

createPlayer()

async function readPlayers(){
    try {
        const player =  await Player.findById('6049c909bc0f7f66fc485a99')
        await player.populate('team').execPopulate()
        //const team =  await Team.find({})
        console.log(player);
        
    } catch (error) {
        console.error(error);
    } 
}

readPlayers()
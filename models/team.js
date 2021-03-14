const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate(value){
            if(value.length < 4){
                throw new Error('Name Length should be greater than 4')
            }
        }
    },
    country:{
        type:String,
        default:'England'
    }
})

module.exports = mongoose.model('Team',teamSchema)
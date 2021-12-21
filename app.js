const express = require('express')
config = require('config')
const mongoose = require('mongoose')
const path = require('path')

console.log('point 1')
const app = express()
console.log('point 2')
app.use(express.json({extended:true}))
console.log('point 3')
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
console.log('point 4')

if (process.env.NODE_ENV === 'production') {
    console.log('point 5')
//    app.use(express.static('client/build'))
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
console.log('point 6')

const port = app.listen(process.env.PORT || 5000);

async function start(){
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, () => console.log(`App has been started on port ${port} ...`))
    } catch (e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
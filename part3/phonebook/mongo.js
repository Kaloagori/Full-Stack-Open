import mongoose from "mongoose"

if (process.argv.length < 3) {
    console.log('insufficient arguments')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.qnvfk14.mongodb.net/phoneBook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length === 5){

    const name = process.argv[3]
    const phoneNumber = process.argv[4]

    const phone = new Phone ({
        name: name,
        number: phoneNumber,
    })

    phone.save().then(result => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    Phone.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(phone => {
            console.log(`${phone.name} ${phone.number}`)
        })
        mongoose.connection.close()
    })
}

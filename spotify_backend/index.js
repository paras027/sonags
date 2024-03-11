//npm init - this is a node project
//npm i express - installs express
//using express

const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const zod = require("zod");
var cors = require('cors');
const jwtpass = "123"
 app.use(cors());
 const bcrypt = require("bcrypt");


require("dotenv").config();
//if we want to make something like password private then we can write it in an env file and save it
const port = 8000;

app.use(cors());

app.use(express.json());
const val = process.env.Pass;
// connect mongoDb to our node app
// mongoose.connect() takes 2 arguments : 
// 1) Which db to connect (db url)
// 2) Connection options


async function poo(){
    await mongoose.connect('mongodb+srv://paras027:'+val+'@cluster0.s2rwujw.mongodb.net/Spotify');
    console.log("connected")
 }
 poo();

 const data = mongoose.model('users', { email:String, password: String, firstname:String, lastname:String, username:String });
 const likedsongs = mongoose.model('liked', { userId:String, values: [{}] });
app.post("/register", async (req, res) => {
    // we are storing data in email,pass etc from the values added by user through req.body
    const { email, password, firstname, lastname, username } = req.body;

    // getting the user with same email
    const user = await data.findOne({ email: email });
    if (user) {   // if we get it then return already existed
        return res.status(403).json({ error: "A user already exists" });
    }


    // we do not store passwords in plain text due to security reasonss
    //we convert plain text to hash which will convert the password like 'xyz' into alot of characters
    const hassPass = await bcrypt.hash(password, 10);
    // creating new user data in DB
    const newUserData = new data({ email:email, password: hassPass, firstname:firstname, lastname:lastname, username:username });
    newUserData.save();
    const idd = newUserData._id;
    const likeddata = new likedsongs({userId:idd,values:[{}]})
    likeddata.save();
    const token = jwt.sign({ idd }, jwtpass);
    return res.status(200).json(token);
});

app.post("/login", async (req, res) => {
    //1: Get email and password sent by user from req.body
    const { email, password } = req.body;
    //2: Check if a user with the given email exists. If not, the credentials are invalid.
    const user = await data.findOne({ email: email });
    if (!user) {
        return res.status(403).json({ error: "Invalid credentials" });
    }

    //comparing normal password with hashcode password we use bcrypt.compare
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
        return res.status(403).json({ error: "Invalid credentials" });
    }

    const idd = user._id
    const token = jwt.sign({ idd }, jwtpass);
    return res.status(200).json(token);

})

app.put('/addsong', async (req, res) => {
    const tok = req.headers.authorization;
    const songname = req.body.songname;
    const thumb = req.body.thumbnail;
    const likes = req.body.likes;
    const link = req.body.link;
    try {
        const decode = jwt.verify(tok, jwtpass);
        console.log("d1");
        const datagot = await likedsongs.findOne({ userId: decode.idd });

        // Find the index of the object with the matching songname
        let indexToDelete = -1;
        if(datagot){
         indexToDelete = datagot.values.findIndex(item => item.songname === songname);
        }
        
        
        if (indexToDelete !== -1) {
            // Remove the object with the matching songname
            const a = datagot.values.splice(indexToDelete, 1);
            
            console.log("Object deleted successfully");
             
        } else
        {
            datagot.values.push({songname:songname ,
                thumbnail:thumb,
                likes:likes,
                link:link
            })
        }
        await datagot.save();
        
        return res.json({datagot});
    } catch (error) {
        console.log(error);
    }
    
});

app.get('/getlikedsongs', async (req, res) => {
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, jwtpass);
        const datagot = await likedsongs.findOne({ userId: decode.idd });
        return res.json({datagot});
    } catch (error) {
        console.log("glt hai");
    }
});
//setup passport jwt
// router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
//     const currUser = req.user;
//     //we need to get all songs where artist id === currentuser.id
//     const songs = await Song.find({ artist: currUser._id });
//     return res.status(200).json({ data: songs });
// });


// app.use("/song", Song);
// app.use("/playlist", Playlistt);
//Now we will tell express that our server will ru on localhost:8000
app.listen(port, () => {
    console.log("App is running on port: " + port);
});
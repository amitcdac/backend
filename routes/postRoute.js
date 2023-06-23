const express = require('express')
const route = express()

const bodyparser = require('body-parser')
route.use(bodyparser.json())
route.use(bodyparser.urlencoded({extended:true}))

const multer = require('multer')
const path = require('path');

route.use(express.static('public'))

const storage = multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,path.join(__dirname,'../public/postImages')),function(error,success)
       {
        if(error){
            console.log(error)
        }
       }
    },
    filename:function(req,file,cb){
           const name = Date.now()+'-'+file.originalname;
           cb(null,name,function(error,success)
           {
            if(error){
                console.log(error)
            }
           })
    }
});

const upload = multer({storage:storage})

const postController = require('../controllers/postController');

route.post('/create-post',upload.single('image'),postController.createPost);

route.get('/get-posts',postController.getPosts)

route.get('/delete-post/:id',postController.deletePost)

route.post('/update-post',upload.single('image'),postController.updatePost);

route.get('/search',postController.search)

route.get('/filter',postController.filter)

route.get('/pagination',postController.pagination)

//route.get('/pagination2',postController.)




module.exports = route

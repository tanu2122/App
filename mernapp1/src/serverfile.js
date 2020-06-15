var mongodb=require('mongodb');
var mongoClient=mongodb.MongoClient;
const url='mongodb://localhost:27017';
const dbName='junedb';
var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');

app=express();

app.use(cors());
 app.use(bodyParser.json());//attaching middleware to express

//endpoint
app.get('/',(req,res)=>{
    res.send('Hello from express');
})


app.get('/getUsers',(req,res)=>{
    mongoClient.connect(url,function(err,client){
        if(err) console.log(err);
        else{
            const db=client.db(dbName);
            db.collection('users').find({}).toArray(function(err,result){
                if(err) console.log(err);
                else{
                   // console.log(result);
                   res.send(result)
                }
            });
            client.close();
        }
    })
})


app.get('/getUser/:name',(req,res)=>{
    mongoClient.connect(url,function(err,client){
        if(err) console.log(err);
        else{
            const db=client.db(dbName);
            db.collection('users').find({name:{$eq:req.params.name}}).toArray(function(err,result){
                if(err) console.log(err);
                else{
                   // console.log(result);
                   res.send(result)
                }
            });
            client.close();
        }
    })
})

app.post('/addUser',(req,res)=>{
    var name=req.body.name;
    var age=req.body.age;
    mongoClient.connect(url,function(err,client){
        if(err) console.log(err);
        else{
            const db=client.db(dbName);
            db.collection('users').insertOne({
                name:name,
                age:age
            });
            res.send('Document is inserted successfully')
            client.close();
        }
    })
})


app.put('/modifyUser/:name',function(req,res){
   var name=req.params.name;
   var age=req.body.age;
   mongoClient.connect(url,function(err,client){
       if(err) console.log(err);
       else{
           const db=client.db(dbName);
           db.collection('users').update({name:{$eq:name}},{$set:{age:age}});
           res.send('Document updated successfully')
       }
       client.close();
   })

})

app.delete('/deleteUser/:name',(req,res)=>{
    mongoClient.connect(url,function(err,client){
        if(err) console.log(err);
        else{
            const db=client.db(dbName);
            db.collection('users').deleteOne({name:req.params.name});
            res.send('Document deleted successfully');
        }
        client.close();
    })
})

app.delete('/deleteUsers',(req,res)=>{
    mongoClient.connect(url,function(err,client){
        if(err) console.log(err);
        else{
            const db=client.db(dbName);
            db.collection('users').deleteMany({});
            res.send('All Documents are deleted successfully');
        }
        client.close();
    })
})


app.listen(3001,()=>{
    console.log('server is started')
})
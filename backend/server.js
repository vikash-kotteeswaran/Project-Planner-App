import DbService from "./db/dbService.mjs";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/api', (req, res) => {
    res.json({'fuck': 'you'});
})

app.get('/api/getAll', (req, res) => {
    const DbInstance = DbService.getInstance();
    const result = DbInstance.getAllData();

    result
    .then(data => {
        console.log(data); 
        res.json({'data': data});
    })
    .catch(err => console.log(err));
})

app.post('/api/addUser', (req, res) => {
    const {name, password} = req.body;
    const DbInstance = DbService.getInstance();
    const result = DbInstance.addRow(name, password);

    result
    .then(data => {
        console.log('server data: ', data);
        res.json({'success': data});
    })
    .catch(err => console.log(err));


    ///////////////////////////////////////////////////////////////////////////////
    // FETCH api POST call to add new user to the table
    // fetch('/api/addUser', {
    //     'headers':{
    //         'content-type': 'application/json'
    //     },
    //     'method': 'POST',
    //     'body': JSON.stringify({'name': 'sidd', 'password': 'mentalistpj'})
    // })
    // .then(response => {
    //     console.log(response);
    //     return response.json();
    // })
    // .then(data => console.log(data));
    ////////////////////////////////////////////////////////////////////////////////
})

app.listen(process.env.PORT || 3030, () => console.log('app is listening'));
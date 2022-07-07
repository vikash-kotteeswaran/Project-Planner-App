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

import DbService from "./db/dbService.mjs";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/api', (req, res) => {
    res.json({'Welcome': 'Mutton kuska wa'});
})

app.get('/api/getAll', (req, res) => {
    const DbInstance = DbService.getInstance();
    const result = DbInstance.getAllData();

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.post('/api/addUser', (req, res) => {
    const {name, password} = req.body;
    const DbInstance = DbService.getInstance();
    const result = DbInstance.addRow(name, password);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.put('/api/updateData', (req, res) => {
    const id = req.body.id;
    const fieldsDict = req.body.fieldsValues;
    const DbInstance = DbService.getInstance();
    const result = DbInstance.updateRow(id, fieldsDict);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err))
})

app.delete('/api/deleteData', (req, res) => {
    const id = req.body.id;

    const DbInstance = DbService.getInstance();
    const result =  DbInstance.deleteRow(id);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.post('/api/searchData', (req, res) => {
    const type = req.body.type.toUpperCase();
    if(type != 'LIKE' && type != '>' && type != '<' && type != '>=' && type != '<=' && type != '='){
        throw new Error('type of search is invalid');
    }

    const nature = req.body.nature.toUpperCase();
    if(nature != 'AND' && nature != 'OR'){
        throw new Error('nature of search is invalid');
    }

    const [field, value] = Object.entries(req.body.searchElement)[0];
    const oldQuery = req.body.oldQuery;

    const DbInstance = DbService.getInstance();
    const result =  DbInstance.searchRows(type, oldQuery, nature, field, value);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT || 3030, () => console.log('app is listening'));
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

import {UserCredDbService, ProjectsDbService, TasksDbService} from "./db/dbService.mjs";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/api', (req, res) => {
    res.json({'Welcome': 'Mutton kuska wa'});
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UsersCred Access

app.get('/api/getAllUsersCred', (req, res) => {
    const start = req.query.start;
    const count = req.query.count;

    const DbInstance = UserCredDbService.getInstance();
    const result = DbInstance.getAllUserCred(start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.post('/api/addUsersCred', (req, res) => {
    const {name, password} = req.body;
    const DbInstance = UserCredDbService.getInstance();
    const result = DbInstance.addUserCred(name, password);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.put('/api/updateUsersCred', (req, res) => {
    const userId = req.body.userId;
    const fieldsDict = req.body.fieldsValues;
    const DbInstance = UserCredDbService.getInstance();
    const result = DbInstance.updateUserCred(userId, fieldsDict);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err))
})

app.delete('/api/deleteUsersCred', (req, res) => {
    const userId = req.body.userId;

    const DbInstance = UserCredDbService.getInstance();
    const result =  DbInstance.deleteUserCred(userId);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.get('/api/searchUsersCred', (req, res) => {
    const types = toObject(req.query.types).map(type => type.toUpperCase());
    checkTypeOfQuery(types);

    const natures = toObject(req.query.natures).map(nature => nature.toUpperCase());
    checkNatureOfQuery(natures);

    const fields = toObject(req.query.fields);
    const values = toObject(req.query.values);
    const start = req.query.start;
    const count = req.query.count;

    const DbInstance = UserCredDbService.getInstance();
    const result =  DbInstance.searchUserCred(types, natures, fields, values, start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProjectsDetails Access

app.get('/api/getAllProjectsDetails', (req, res) => {
    const start = req.query.start;
    const count = req.query.count;

    const DbInstance = ProjectsDbService.getInstance();
    const result = DbInstance.getAllProjectsDetails(start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.post('/api/addProjectsDetails', (req, res) => {
    const {title, userId, admin, description, status} = req.body;
    const DbInstance = ProjectsDbService.getInstance();
    const result = DbInstance.addProjectsDetails(title, userId, admin, description, status);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.put('/api/updateProjectsDetails', (req, res) => {
    const projectId = req.body.projectId;
    const fieldsDict = req.body.fieldsValues;
    const DbInstance = ProjectsDbService.getInstance();
    const result = DbInstance.updateProjectsDetails(projectId, fieldsDict);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err))
})

app.delete('/api/deleteProjectsDetails', (req, res) => {
    const projectId = req.body.projectId;

    const DbInstance = ProjectsDbService.getInstance();
    const result =  DbInstance.deleteProjectsDetails(projectId);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.get('/api/searchProjectsDetails', (req, res) => {
    const types = toObject(req.query.types).map(type => type.toUpperCase());
    checkTypeOfQuery(types);

    const natures = toObject(req.query.natures).map(nature => nature.toUpperCase());
    checkNatureOfQuery(natures);

    const fields = toObject(req.query.fields);
    const values = toObject(req.query.values);
    const start = req.query.start;
    const count = req.query.count;

    const DbInstance = ProjectsDbService.getInstance();
    const result =  DbInstance.searchProjectsDetails(types, natures, fields, values, start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.get('/api/getUserProjectsDetails', (req, res) => {
    const start = req.query.start;
    const count = req.query.count;
    const userId = req.query.userId;

    const DbInstance = ProjectsDbService.getInstance();
    const result = DbInstance.getUserProjectsDetails(userId, start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.get('/api/getProjectMembers', (req, res) => {
    const projectId = req.query.projectId;

    const DbInstance = ProjectsDbService.getInstance();
    const result = DbInstance.getProjectMembers(projectId);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.post('/api/addUserToProject', (req, res) => {
    const userId = req.body.userId;
    const projectId = req.body.projectId;

    const DbInstance = ProjectsDbService.getInstance();
    const result = DbInstance.addUserToProject(userId, projectId);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProjectsDetails Access

app.get('/api/getAllTasks', (req, res) => {
    const start = req.query.start;
    const count = req.query.count;

    const DbInstance = TasksDbService.getInstance();
    const result = DbInstance.getAllTasks(start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.post('/api/addTasks', (req, res) => {
    const {userId, projectId, title, description, status} = req.body;
    const DbInstance = TasksDbService.getInstance();
    const result = DbInstance.addTasks(userId, projectId, title, description, status);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.put('/api/updateTasks', (req, res) => {
    const taskId = req.body.taskId;
    const fieldsDict = req.body.fieldsValues;
    const DbInstance = TasksDbService.getInstance();
    const result = DbInstance.updateTasks(taskId, fieldsDict);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err))
})

app.delete('/api/deleteTasks', (req, res) => {
    const taskId = req.body.taskId;

    const DbInstance = TasksDbService.getInstance();
    const result =  DbInstance.deleteTasks(taskId);

    result
    .then(data => res.json({'success': data}))
    .catch(err => console.log(err));
})

app.get('/api/searchTasks', (req, res) => {
    const types = toObject(req.query.types).map(type => type.toUpperCase());
    checkTypeOfQuery(types);

    const natures = toObject(req.query.natures).map(nature => nature.toUpperCase());
    checkNatureOfQuery(natures);

    const fields = toObject(req.query.fields);
    const values = toObject(req.query.values);
    const start = req.query.start;
    const count = req.query.count;

    const DbInstance = TasksDbService.getInstance();
    const result =  DbInstance.searchTasks(types, natures, fields, values, start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

app.get('/api/getUserTasks', (req, res) => {
    const start = req.query.start;
    const count = req.query.count;
    const userId = req.query.userId;
    const type = req.query.type;

    const DbInstance = TasksDbService.getInstance();
    const result = DbInstance.getUserTasks(userId, type, start, count);

    result
    .then(data => res.json({'success': {'data': data}}))
    .catch(err => console.log(err));
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/*', (req, res) => {
    res.json({'Error': 'Invalid Api Call'});
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Helper Functions

const checkNatureOfQuery = (natures) => {
    for(let nature of natures){
        if(nature != 'AND' && nature != 'OR'){
            throw new Error('nature of search is invalid');
        }
    }
}

const checkTypeOfQuery = (types) => {
    for(let type of types){
        if(type != 'LIKE' && type != '>' && type != '<' && type != '>=' && type != '<=' && type != '='){
            throw new Error('type of search is invalid');
        }
    }
}

const toObject = (data) => {
    if(typeof(data) != "object"){
        data = [data];
    }
    return data;
}

app.listen(process.env.PORT || 3030, () => console.log('app is listening'));
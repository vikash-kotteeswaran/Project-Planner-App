import * as dotenv from 'dotenv';
import * as mysql from 'mysql';
dotenv.config({path:'db/.env'})

let UsersCredInstance = null;
let ProjectsInstance = null;
let TasksInstance = null;

console.log(process.env.DB_PORT);

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    multipleStatements: true
});

setInterval(() => {connection.query('SELECT 1')}, 5000);

connection.connect((err) => {
    if(err){
        console.log(err);
    } else{
        console.log('db '+connection.state);
    }
});

export class UserCredDbService {

    static getInstance(){
        return UsersCredInstance? UsersCredInstance : new UserCredDbService();
    }

    async getAllUserCred(start, count){ 
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = 'SELECT id as userId, name as userName, role as userRole, date as userJoinedDate FROM usersCred';
                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                query += ';';
    
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;
        } catch(err){
            console.log(err);
        };
    };

    async addUserCred(name, password) {
        // res - result, resp - response, reject, resolve, err - error
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "INSERT INTO usersCred (name, password, date) VALUES (?, ?, CURRENT_TIMESTAMP)";

                connection.query(query, [name, password], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return {'affectedRows': resp.affectedRows, 'insertId': resp.insertId};

        } catch(err) {
            console.log(err);
        };
    };

    async updateUserCred(userId, colNvalDict){
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = "UPDATE usersCred SET";
                const entries = Object.entries(colNvalDict);
                query += ` ${entries[0][0]} = '${entries[0][1]}' `;

                for(let i of entries.slice(1,)){
                    query += `, ${i[0]} = '${i[1]}' `;
                }
                
                query += "WHERE id = ?;";

                connection.query(query, [userId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return {'changedRows': resp.changedRows, 'affectedRows': resp.affectedRows};
            
        } catch(err){
            console.log(err);
        };
    };

    async deleteUserCred(userId){
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "DELETE FROM usersCred WHERE id = ?;"

                connection.query(query, [userId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                }); 
            });

            console.log('server resp: ', resp);

            return {'changedRows': resp.changedRows, 'affectedRows': resp.affectedRows};

        } catch(err){
            console.log(err);
        };
    };

    async searchUserCred(types, natures, fields, values, start, count){
        try{
            const resp = await new Promise((resolve, reject) => {
                if(types[0] == 'LIKE') values[0] = `%${values[0]}%`;
                let query = `SELECT id as userId, name as userName, role as userRole, date as userJoinedDate FROM usersCred WHERE ${fields[0]} ${types[0]} '${values[0]}'`;

                for(let i = 1; i< types.length; i++){
                    if(types[i] == 'LIKE') values[i] = `%${values[i]}%`;
                    query += `${natures[i-1]} ${fields[i]} ${types[i]} '${values[i]}'`;
                }

                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                
                query += ";";

                console.log(query);

                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;

        } catch(err){
            console.log(err);
        }
    }
};

export class ProjectsDbService {

    static getInstance(){
        return ProjectsInstance? ProjectsInstance : new ProjectsDbService();
    }

    async getAllProjectsDetails(start, count){ 
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = "SELECT id as projectId, title, description, status, admin as creator, createdDate FROM projectsDetails";
                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                query += ';';
    
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;
        } catch(err){
            console.log(err);
        };
    };

    async addProjectsDetails(title, userId, admin, description, status) {
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = `INSERT INTO projectsDetails (title, admin, description, status) VALUES (?, ?, ?, ?);
                SELECT @dateCreated:=createdDate as createdDate FROM projectsDetails WHERE id = LAST_INSERT_ID();
                INSERT INTO projectsAndUsers (userId, projectId, projectRole, dateJoinedProject) VALUES(?, LAST_INSERT_ID(), 'admin', @dateCreated);`;

                connection.query(query, [title, admin, description, status, userId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return (
                {
                    'projectsDetails': {'affectedRows': resp[0].affectedRows, 'insertId': resp[0].insertId},
                    'projectsAndUsers': {'affectedRows': resp[1].affectedRows, 'insertId': resp[1].insertId}
                }
            );

        } catch(err) {
            console.log(err);
        };
    };

    async updateProjectsDetails(projectId, colNvalDict){
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = "UPDATE projectsDetails SET";
                const entries = Object.entries(colNvalDict);
                query += ` ${entries[0][0]} = '${entries[0][1]}' `;

                for(let i of entries.slice(1,)){
                    query += `, ${i[0]} = '${i[1]}' `;
                }
                
                query += "WHERE id = ?;";

                connection.query(query, [projectId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return {'changedRows': resp.changedRows, 'affectedRows': resp.affectedRows};
            
        } catch(err){
            console.log(err);
        };
    };

    async deleteProjectsDetails(projectId){
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = `DELETE FROM projectsDetails WHERE id = ?;
                               DELETE FROM projectsAndUsers WHERE projectId = ?;
                               DELETE FROM tasks WHERE projectId = ?;`

                connection.query(query, [projectId, projectId, projectId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                }); 
            });

            console.log('server resp: ', resp);

            return (
                {
                    'projectsDetails': {'changedRows': resp[0].changedRows, 'affectedRows': resp[0].affectedRows},
                    'projectsAndUsers' : {'changedRows': resp[1].changedRows, 'affectedRows': resp[1].affectedRows},
                    'tasks': {'changedRows': resp[2].changedRows, 'affectedRows': resp[2].affectedRows}
                }
            );

        } catch(err){
            console.log(err);
        };
    };

    async searchProjectsDetails(types, natures, fields, values, start, count){

        try{
            const resp = await new Promise((resolve, reject) => {
                if(types[0] == 'LIKE') values[0] = `%${values[0]}%`;
                let query = `SELECT id as projectId, title, description, status, admin as creator, createdDate FROM projectsDetails WHERE ${fields[0]} ${types[0]} '${values[0]}'`;

                for(let i = 1; i< types.length; i++){
                    if(types[i] == 'LIKE') values[i] = `%${values[i]}%`;
                    query += `${natures[i-1]} ${fields[i]} ${types[i]} '${values[i]}'`;
                }
                
                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                query += ';';

                console.log(query);

                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;

        } catch(err){
            console.log(err);
        }
    }

    async getUserProjectsDetails(userId, start, count){
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = `SELECT projectsDetails.id as projectId, projectsAndUsers.userId as userId, 
                projectsAndUsers.projectRole as projectRole, projectsDetails.title as title, projectsDetails.description as description, 
                projectsDetails.status as status, projectsDetails.admin as creator, projectsDetails.createdDate as projectCreatedDate, 
                projectsAndUsers.dateJoinedProject as userDateJoined FROM projectsDetails INNER JOIN projectsAndUsers ON 
                projectsDetails.id = projectsAndUsers.projectId WHERE projectsAndUsers.userId = ?`;

                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                query += ';';

                connection.query(query, [userId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;

        } catch(err) {
            console.log(err);
        }
    };

    async getProjectMembers(projectId) {
        try{
            const resp = new Promise((resolve, reject) => {
                const query = "SELECT usersCred.id as userId, usersCred.name as userName, projectsAndUsers.projectRole as projectRole FROM usersCred JOIN projectsAndUsers ON projectsAndUsers.userId = usersCred.id WHERE projectsAndUsers.projectId = ? AND projectsAndUsers.projectRole != 'admin'";

                connection.query(query, [projectId], (err, res) => {
                    if(err) reject(new Error(err.message))
                    else resolve(res)
                });
            });

            console.log('server resp: ', resp);

            return resp;
            
        } catch(err) {
            console.log(err);
        }
    };

    async addUserToProject(userId, projectId) {
        try{
            const resp = new Promise((resolve, reject) => {
                const query = "INSERT INTO projectsAndUsers (userId, projectId, projectRole) VALUES (?, ?, 'member')";

                connection.query(query, [userId, projectId], (err, res) => {
                    if(err) reject(new Error(err.message))
                    else resolve(res)
                });
            });

            console.log('server resp: ', resp);

            return {'affectedRows': resp.affectedRows, 'insertId': resp.insertId};
        }
        catch(err) {
            console.log(err);
        }
    };
};

export class TasksDbService {

    static getInstance(){
        return TasksInstance? TasksInstance : new TasksDbService();
    }

    async getAllTasks(start, count){ 
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = `SELECT tasks.id as taskId, tasks.projectId, tasks.userId, usersCred.name, tasks.userAssignedId, 
                             secondJoin.name as userAssignedName, tasks.title, tasks.description, tasks.status, tasks.createdDate 
                             FROM tasks JOIN usersCred ON tasks.userId = usersCred.id 
                             LEFT JOIN usersCred as secondJoin ON tasks.userAssignedId = secondJoin.id;`;
                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                query += ';';
    
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;
        } catch(err){
            console.log(err);
        };
    };

    async addTasks(userId, projectId, title, description, status) {
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tasks (userId, projectId, title, description, status) VALUES (?, ?, ?, ?, ?);";

                connection.query(query, [userId, projectId, title, description, status], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return {'affectedRows': resp.affectedRows, 'insertId': resp.insertId};

        } catch(err) {
            console.log(err);
        };
    };

    async updateTasks(taskId, colNvalDict){
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = "UPDATE tasks SET";
                const entries = Object.entries(colNvalDict);
                query += ` ${entries[0][0]} = '${entries[0][1]}' `;

                for(let i of entries.slice(1,)){
                    query += `, ${i[0]} = '${i[1]}' `;
                }
                
                query += "WHERE id = ?;";

                connection.query(query, [taskId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return {'changedRows': resp.changedRows, 'affectedRows': resp.affectedRows};
            
        } catch(err){
            console.log(err);
        };
    };

    async deleteTasks(taskId){
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "DELETE FROM tasks WHERE id = ?;"

                connection.query(query, [taskId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                }); 
            });

            console.log('server resp: ', resp);

            return {'changedRows': resp.changedRows, 'affectedRows': resp.affectedRows};

        } catch(err){
            console.log(err);
        };
    };

    async searchTasks(types, natures, fields, values, start, count){

        try{
            const resp = await new Promise((resolve, reject) => {
                if(types[0] == 'LIKE') values[0] = `%${values[0]}%`;
                let query = `SELECT tasks.id as taskId, tasks.projectId, tasks.userId as creatorUserId, usersCred.name as creatorName, tasks.userAssignedId, 
                             secondJoin.name as userAssignedName, tasks.title, tasks.description, tasks.status, tasks.createdDate 
                             FROM tasks JOIN usersCred ON tasks.userId = usersCred.id 
                             LEFT JOIN usersCred as secondJoin ON tasks.userAssignedId = secondJoin.id WHERE tasks.${fields[0]} ${types[0]} '${values[0]}'`;

                for(let i = 1; i< types.length; i++){
                    if(types[i] == 'LIKE') values[i] = `%${values[i]}%`;
                    query += `${natures[i-1]} ${fields[i]} ${types[i]} '${values[i]}'`;
                }
                
                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                query += ';';

                console.log(query);

                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;

        } catch(err){
            console.log(err);
        }
    }

    async getUserTasks(userId, type, start, count){
        try{
            let fieldChange = '';
            if(type.toLowerCase() =='assigned') fieldChange = 'Assigned';

            const resp = await new Promise((resolve, reject) => {
                let query = `SELECT tasks.id as taskId, tasks.projectId, tasks.userId as creatorUserId, usersCred.name as creatorName, tasks.userAssignedId, 
                               secondJoin.name as userAssignedName, tasks.title, tasks.description, tasks.status, tasks.createdDate 
                               FROM tasks JOIN usersCred ON tasks.userId = usersCred.id 
                               LEFT JOIN usersCred as secondJoin ON tasks.userAssignedId = secondJoin.id WHERE tasks.user${fieldChange}Id = ?`;

                if(count != null) {
                    query += ` LIMIT ${count}`;
                    if(start != null) {
                        query += ` OFFSET ${start}`;
                    } else {
                        query += ` OFFSET 0`;
                    }
                }
                query += ';';

                connection.query(query, [userId], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                });
            });

            console.log('server resp: ', resp);

            return resp;

        } catch(err) {
            console.log(err);
        }
    };
};

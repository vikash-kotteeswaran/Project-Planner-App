import * as dotenv from 'dotenv';
import * as mysql from 'mysql';
dotenv.config({path:'db/.env'})
let instance = null;

console.log(process.env.DB_PORT);

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
});

setInterval(() => {connection.query('SELECT 1')}, 5000);

connection.connect((err) => {
    if(err){
        console.log(err);
    } else{
        console.log('db '+connection.state);
    }
});

class DbService {

    static getInstance(){
        return instance? instance : new DbService();
    }

    async getAllData(){ 
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM user;";
    
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

    async addRow(name, password) {
        // res - result, resp - response, reject, resolve, err - error
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "INSERT INTO user (name, password, date) VALUES (?, ?, CURRENT_TIMESTAMP)";

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

    async updateRow(id, colNvalDict){
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = "UPDATE user SET";
                const entries = Object.entries(colNvalDict);
                query += ` ${entries[0][0]} = '${entries[0][1]}' `;

                for(let i of entries.slice(1,)){
                    query += `, ${i[0]} = '${i[1]}' `;
                }
                
                query += "WHERE id = ?;";

                connection.query(query, [id], (err, res) => {
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

    async deleteRow(id){
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "DELETE FROM user WHERE id = ?;"

                connection.query(query, [id], (err, res) => {
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

    async searchRows(type, oldQuery, nature, column, value){
        try{
            const resp = await new Promise((resolve, reject) => {
                let query = oldQuery? oldQuery.replace(';', '') + ` ${nature} ` : `SELECT * FROM user WHERE `;

                if(type == 'LIKE'){
                    value = `%${value}%`;
                }

                query += `${column} ${type} '${value}';`;

                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve({'data' : res, 'query': query});
                });
            });

            console.log('server resp: ', resp);

            return resp;

        } catch(err){
            console.log(err);
        }
    }
};

export default DbService;
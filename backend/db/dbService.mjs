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
            })

            return resp;
        } catch(err){
            console.log(err);
        }
    }

    async addRow(name, password) {
        try{
            const resp = await new Promise((resolve, reject) => {
                const query = "INSERT INTO user (name, password, date) VALUES (?, ?, CURRENT_TIMESTAMP)";

                connection.query(query, [name, password], (err, res) => {
                    if(err) reject(new Error(err.message));
                    else resolve(res);
                })
            })

            console.log('server resp: ', resp)

            return {'name': name, 'password': password};

        } catch(err) {
            console.log(err);
        }
    }
}

export default DbService;
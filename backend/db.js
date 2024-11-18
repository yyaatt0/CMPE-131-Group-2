import mysql from 'mysql2';
import 'dotenv/config'; 

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the connection pool
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
    console.log('Connected to the database using the connection pool');
    connection.release(); // Release the connection back to the pool
});

export default db; 
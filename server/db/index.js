import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const db= new pg.Client({




})

db.connect();

export default db;
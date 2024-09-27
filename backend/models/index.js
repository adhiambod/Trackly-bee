// models/index.js

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import configFile from '../../config/config.json' assert { type: 'json' }; // Adjusted path

dotenv.config();

// Log environment variables
console.log('JWT_SECRET in models/index:', process.env.JWT_SECRET);

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

// Initialize Sequelize instance
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

// Dynamically import all model files
const modelFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== basename);

for (const file of modelFiles) {
    try {
        const modelPath = path.join(__dirname, file);
        const modelModule = await import(modelPath);
        const model = modelModule.default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    } catch (error) {
        console.error(`Error importing model ${file}:`, error);
    }
}

// Set up associations for the models
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Export the Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize }; // Explicit export
export default db;

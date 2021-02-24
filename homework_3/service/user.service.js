const dataBase = require('../dataBase/users.json');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');

const dataPath = path.join(__dirname, 'dataBase', 'users.json');

const message = require('../message/messages');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
    findAllUsers: async (preferLanguage, query) => {
            const data = await readFile(dataPath);

            const users = JSON.parse(data.toString());
            const {name} = query;

            if (!name) {
                return users;
            }

            const user = users.find(user => user.name === name);

            if(!user) {
                throw new Error(message.NO_RESULT[preferLanguage]);
            }
            return user;
        },

    findUserById: async (preferLanguage, userId) => {
        const data = await readFile(dataPath);

        const user = JSON.parse(data.toString())[userId];

        if(!user) {
            throw new Error(message.NO_RESULT[preferLanguage]);
        }
        return user;
    },

    createUser: async (preferLanguage, user) => {
        const data = await readFile(dataPath);

        const users = JSON.parse(data.toString());

        if(users.find(userDB => userDB.name === user.name)) {
            throw new Error(message.USER_EXIST[preferLanguage]);
        }

        users.push(user);
        await writeFile(dataPath, JSON.stringify(users));
    },

    deleteUser: async (userId) => {
        const data = await readFile(dataPath);

        const users = JSON.parse(data.toString());

        users.splice(userId, 1);
        await writeFile(dataPath, JSON.stringify(users));
    },
}

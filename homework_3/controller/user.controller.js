const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const message = require('../message/messages');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const {preferLanguage = 'ua'} = req.body;

            const users = await userService.findAllUsers(preferLanguage,req.body);

            res.status(errorCodes.OK).json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },

    getSingleUser: async (req, res) => {
       try {
           const { userId } = req.params;
           const { preferLanguage = 'ua' } = req.body;

           const user = await userService.findUserById(userId, preferLanguage);

           res.status(errorCodes.OK).json();
       } catch (e) {
           res.status(errorCodes.BAD_REQUEST).json(e.message)
       }
    },

    createUser: async (req, res) => {
        try {
            const { name, password, preferLanguage = 'ua' } = req.body;
            const user = {name, password}

            await userService.createUser(user,preferLanguage);

            res.status(errorCodes.CREATED).json(message.USER_CREATED);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },

    deleteSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferLanguage = 'ua' } = req.body;

            await userService.deleteUser(userId);

            res.status(errorCodes.OK).json(message.USER_DELETED[preferLanguage]);
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
}

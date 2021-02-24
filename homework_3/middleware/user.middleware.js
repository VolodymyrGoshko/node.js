const errorCodes = require('../constant/errorCodes.enum');
const messages = require('../message/messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const {preferLanguage = 'ua'} = req.body;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(messages.NOT_VALID_ID[preferLanguage]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {name, password, preferLanguage = 'ua'} = req.body;

            if (!name || !password) {
                throw new Error(messages.FIELD_EMPTY[preferLanguage]);
            }

            if (password.length < 6) {
                throw new Error(messages.TOO_WEAK_PASSWORD[preferLanguage]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
}

const Role = require('../models/role');

const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            Role.create({ name: 'admin' }),
            Role.create({ name: 'user' }),
            Role.create({ name: 'moderator' })
        ]);

        console.log(values);
    } catch (error) {
     console.log(error);
    }
}

module.exports = createRoles;
const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
    }
},
    {
        versionKey: false
    }
);

module.exports = mongoose.models.Role || mongoose.model('Role', RoleSchema)
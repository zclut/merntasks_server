const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: [{
        ref: 'Role',
        type: mongoose.Schema.Types.ObjectId,
    }]
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('User', UserSchema);
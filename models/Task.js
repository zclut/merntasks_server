const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Task', TaskSchema);
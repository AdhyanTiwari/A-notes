const { default: mongoose } = require("mongoose");

const NoteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    data: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: "General"
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }
})

module.exports = mongoose.model("Notes", NoteSchema);
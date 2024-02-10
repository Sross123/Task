const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Address-book');

const addressSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }
});

const AddressModal = mongoose.model('address', addressSchema);
module.exports = AddressModal;
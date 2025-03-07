import mongoose from 'mongoose';

const clientIDsSchema = new mongoose.Schema({
    customerID: {
        type: String,
        required: true
    },
    IDs: {
        type: [String],
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});
const clientIDs = mongoose.model('ClientID', clientIDsSchema);
export default clientIDs;
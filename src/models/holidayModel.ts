import mongoose, { Schema } from 'mongoose';
import { IUser } from './userModel';

export interface IHoliday extends mongoose.Document {
    userId: mongoose.Types.ObjectId | IUser;
    date: string;
    name: string;
    countryCode: string;
    global: boolean;
}

const holidaySchema = new Schema<IHoliday>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        },
        global: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


holidaySchema.index({ userId: 1, date: 1 });
holidaySchema.index({ countryCode: 1 });

const Holiday = mongoose.model<IHoliday>('Holiday', holidaySchema);

export default Holiday;
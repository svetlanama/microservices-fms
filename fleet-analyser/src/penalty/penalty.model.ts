import * as mongoose from 'mongoose';

export const PenaltySchema = new mongoose.Schema({
  id_driver: { type: Number, required: true },
  penalty: { type: Number, required: true },
});

export interface Penalty extends mongoose.Document {
  id: string;
  id_driver: number;
  penalty: number;
}

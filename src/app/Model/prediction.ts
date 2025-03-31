import mongoose, { Schema, Document } from 'mongoose';

// Define the schema
interface IPrediction extends Document {
  user_id: mongoose.Types.ObjectId;
  movie_id: mongoose.Types.ObjectId;
  predicted_rating: number;
}

const PredictionSchema = new Schema<IPrediction>({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  predicted_rating: { type: Number, required: true }
});

// Create the model
const PredictionModel = mongoose.models.Prediction || mongoose.model<IPrediction>('Prediction', PredictionSchema);

export default PredictionModel;

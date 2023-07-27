import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const TowerEventSchema = new Schema({

  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxlength: 75, minlength: 5 },
  description: { type: String, required: true },
  coverImg: { type: String, required: true, maxLength: 250, minLength: 3 },
  location: { type: String, required: true, maxlength: 25, minlength: 3 },
  capacity: { type: Number, required: true, max: 500 },
  startDate: { type: Date, required: true, maxlength: 10 },
  isCanceled: { type: Boolean, required: true, minlength: 3, default: false },
  type: { type: String, enum: ['concert', 'sport', 'digital', 'convention', 'misc'], required: true, default: 'misc' },

},
  { timestamps: true, toJSON: { virtuals: true } })


TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  count: true
})
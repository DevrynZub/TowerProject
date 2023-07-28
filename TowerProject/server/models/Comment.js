import { Schema } from "mongoose";


export const CommentSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
  body: { type: String, require: true, maxlength: 200, minlength: 10 },
  isAttending: { type: Boolean, required: true, minlength: 5, default: false },
},
  { timestamps: true, toJSON: { virtuals: true } })



CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})

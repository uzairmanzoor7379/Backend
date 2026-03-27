import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    }
    
  },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } }

);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return ;
  try {
    this.password = await bcrypt.hash(this.password, 10);
   
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const userModel = model('User', userSchema);
export default userModel

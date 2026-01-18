import mongoose, { Schema, Model, Document } from 'mongoose';

// User model
export interface IUser extends Document {
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Post model
export interface IPost extends Document {
  title: string;
  content?: string;
  published: boolean;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes
postSchema.index({ author: 1 });
postSchema.index({ published: 1, createdAt: -1 });

// Export models (handle hot reloading in development)
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

// Type helpers for lean queries
export type UserLean = Omit<IUser, keyof Document>;
export type PostLean = Omit<IPost, keyof Document>;

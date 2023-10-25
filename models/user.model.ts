import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    pulic_Id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ CourseId: string }>;
  comparePasswords: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minLength: [6, "password must be at least 6 characters"],
      select: false,
    },

    avatar: {
      public_Id: String,
      url: String,
    },

    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

//Hash Password Before Saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Compare the password
userSchema.methods.comparePasswords = async function (enteredPassword: string): Promise<boolean> { 
    return await bcrypt.compare(enteredPassword, this.assword)
}

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel
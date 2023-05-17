const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
      ],
    },
    profileImg: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
    description: { type: String, default: "No existe descripción." },
    // add roles setup here
    role: {
      type: String,
      enum: ["USER", "VIP", "ADMIN"],
      default: "USER",
    },
    animes: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

# IRONWEEB
API REST OF ANIME - by JOSE AGUAYO and JAVIER VIVAS

## Description
IronWeeb is an application made for you to follow the anime series that you like most.

## Built with
- HTML / CSS / JavaScript / Handlebars
- npm / MongoDB / NodeJS / ExpressJS

## Models

### Anime.model.js
{ mal_id: Number,
  url: String,
  title: String,
  images: {
    jpg: {
      image_url: { type: String },
      small_image_url: { type: String },
      large_image_url: { type: String },
    },
  },
  episodes: { type: Number },
  status: { type: String },
  trailer: {
    youtube_id: { type: String },
    url: { type: String },
    embed_url: { type: String },
  },
  synopsis: String,
  score: Number,
  themes: [{ type: Object }],
  genres: [{ type: Object }],
}

### Character.model.js
mal_id: {
    type: Number,
  },
  url: {
    type: String,
  },
  images: {
    jpg: {
      image_url: {
        type: String,
      },
      small_image_url: {
        type: String,
      },
    },
    webp: {
      image_url: {
        type: String,
      },
      small_image_url: {
        type: String,
      },
    },
  },
  name: {
    type: String,
  },
  name_kanji: {
    type: String,
  },
  nicknames: {
    type: [String],
  },
  favorites: {
    type: Number,
  },
  about: {
    type: String,
  },
}

### User.model.js
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

import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV;

dotenv.config({ path: [`.env.${NODE_ENV}`, ".env"] });

const envConfig = {
  port: process.env.PORT,

  database: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
  },

  encryption: {
    key: process.env.ENCRYPTION_KEY,
    iv: parseInt(process.env.IV_LENGTH),
  },

  jwt: {
    user: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiration: process.env.ACCESS_TOKEN_EXPIRATION,
    },
  },
};

export default envConfig;

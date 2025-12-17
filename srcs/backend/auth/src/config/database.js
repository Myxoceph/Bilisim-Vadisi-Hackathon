import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "postgres",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "adminpassword",
  database: process.env.DB_NAME || "auth_db",
  logging: process.env.NODE_ENV === "production" ? false : console.log,
  pool: {
    max: 10, // Increased from 5 for better concurrency
    min: 2, // Keep minimum connections ready
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: false,
  },
  benchmark: process.env.NODE_ENV !== "production",
  logQueryParameters: process.env.NODE_ENV !== "production",
  retry: {
    max: 3,
  },
});

export default sequelize;

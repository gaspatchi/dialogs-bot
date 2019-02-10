import config from "../config";
import Sequelize from "sequelize";

const sequelize = new Sequelize(config.db.db, config.db.user, config.db.password, {
	host: config.db.host,
	dialect: "postgres",
	operatorsAliases: false
});

export default sequelize;
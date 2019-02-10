import sequelize from "./index";
import Sequelize from "sequelize";

export const Sessions = sequelize.define("sessions", {
	session_id: {
		type: Sequelize.STRING
	},
	data: {
		type: Sequelize.JSON
	}
});

export const Groups = sequelize.define("groups", {
	group: {
		type: Sequelize.STRING,
		unique: true
	},
	group_id: {
		type: Sequelize.INTEGER,
		unique: true
	},
	rating: {
		type: Sequelize.INTEGER
	}
});

Sessions.sync();
Groups.sync();

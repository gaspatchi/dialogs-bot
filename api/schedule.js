import config from "../config";
import axios from "axios";

export async function fetchGroup(group) {
	let info = await axios.post(`${config.site}/api/info/group/find`, {
		query: group
	});
	return info.data;
}

export async function fetchSchedule(group_id) {
	let schedule = await axios.get(
		`${config.site}/api/schedule/group/${group_id}`
	);
	return schedule.data;
}

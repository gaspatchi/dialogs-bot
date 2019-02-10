import { Sessions, Groups } from "./models";

export async function createSession(session_id, data) {
	let result = await Sessions.create({
		session_id: session_id,
		data
	});
	return result;
}

export async function showSession(session_id) {
	let result = await Sessions.findOne({ where: { session_id: session_id } });
	return result;
}

export async function fetchPopularGroups() {
	let result = await Groups.findAll({
		limit: 6,
		order: [["rating", "DESC"]]
	});
	return result;
}

export async function increaseRating(group, group_id) {
	await Groups.findOrCreate({
		where: { group, group_id },
		defaults: { rating: 0 }
	});
	await Groups.increment("rating", { where: { group, group_id } });
}

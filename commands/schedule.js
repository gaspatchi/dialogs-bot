import config from "../config";
import { fetchPopularGroups, increaseRating } from "../db/methods";
import _ from "lodash";
import { fetchGroup, fetchSchedule } from "../api/schedule";

export async function searchSchedule(session, version, ctx) {
	let regex = /(?:\d+ [ф|Ф]|\d+)/gim;
	let group =
		ctx.request.body.request.command ||
		ctx.request.body.request.payload.command;
	group = group.match(regex);
	if (_.isNull(group)) {
		try {
			let buttons = await showPopularGroups();
			return (ctx.body = {
				version,
				session,
				response: {
					text: config.empty_group,
					buttons,
					end_session: false
				}
			});
		} catch (e) {
			return (ctx.body = {
				version,
				session,
				response: {
					text: config.unknown_command,
					end_session: false
				}
			});
		}
	} else {
		group = group[0].replace(" ", "-");
		await showGroupSchedule(group, version, session, ctx);
	}
}

export async function showGroupSchedule(group, version, session, ctx) {
	try {
		var groupInfo = await fetchGroup(group);
	} catch (e) {
		if (e.response.status === 404) {
			return (ctx.body = {
				version,
				session,
				response: {
					text: config.unknown_group,
					buttons: [
						{
							title: "К раписанию",
							url: config.site + "/schedule/",
							hide: true
						}
					],
					end_session: false
				}
			});
		} else {
			return (ctx.body = {
				version,
				session,
				response: {
					text: config.unknown_command,
					end_session: false
				}
			});
		}
	}
	try {
		let groupSchedule = await fetchSchedule(groupInfo.result[0].group_id);
		await increaseRating(group, groupInfo.result[0].group_id);
		let schedule = formatSchedule(groupSchedule);
		ctx.body = {
			version,
			session,
			response: {
				text: schedule,
				end_session: false
			}
		};
	} catch (e) {
		if (e.response.status === 404) {
			return (ctx.body = {
				version,
				session,
				response: {
					text: e.response.data.message,
					end_session: false
				}
			});
		} else {
			return (ctx.body = {
				version,
				session,
				response: {
					text: config.unknown_command,
					end_session: false
				}
			});
		}
	}
}

async function showPopularGroups() {
	let groups = await fetchPopularGroups();
	let buttons = [];
	for (let group of groups) {
		buttons.push({
			title: group.group,
			payload: {
				command: "SHOW_GROUP_SHEDULE",
				group: group.group,
				group_id: group.group_id
			},
			hide: true
		});
	}
	return buttons;
}

function formatSchedule(schedule) {
	let groupSchedule = `Расписание занятий для группы ${
		schedule.schedule[0].group.group
	} на ${schedule.schedule[0].date}\n`;
	for (let pair of schedule.schedule) {
		groupSchedule += pair.index + ") " + pair.lesson.lesson + "\n";
	}
	return groupSchedule;
}

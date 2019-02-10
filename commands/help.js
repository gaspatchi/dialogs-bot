export default async function showHelpMessage(session, version, ctx) {
	ctx.body = {
		version,
		session,
		response: {
			text: `Салют, вот некоторые из моих команд:\n
			Покажи расписание группы 331\n
			Покажи последние новости`,
			buttons: [
				{
					title: "Расписание 📅",
					payload: {
						command: "GROUP_SCHEDULE"
					},
					hide: true
				},
				{
					title: "Новости 📰",
					payload: {
						command: "SHOW_NEWS"
					},
					hide: true
				}
			],
			end_session: false
		}
	};
}

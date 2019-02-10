export default {
	site: "https://xn----etbgb7bzaw.xn--p1ai",
	exit_message: "Досвидания, всегда к вашим услугам",
	welcome_message:
		"Привет, расписание и новости, вот о чем меня обычно спрашивают",
	last_news: "Последние новости:",
	empty_group:
		"Вы не указали группу, можете выбрать одну из популярных или повторить запрос",
	unknown_group:
		"К сожалению в моей базе нет такой группы, возможно это ошибка и вам стоит поискать эту группу на сайте",
	unknown_command:
		"Кажется мой рабочий день уже закончился, или просто какие-то неполадки с подключением 💁‍♀️",
	db: {
		host: process.env.DBHOST,
		db: process.env.DB,
		user: process.env.USER,
		password: process.env.PASSWORD
	},
	fuse: {
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 1,
		keys: ["commands"]
	}
};

export default [
	{
		commands: ["приветствие", "привет", "здравствуйте", "запусти навык георгиевский техникум"],
		type: "WELCOME"
	},
	{
		commands: ["что ты умеешь", "помощь"],
		type: "HELP"
	},
	{
		commands: ["покажи расписание", "расписание группы"],
		type: "GROUP_SCHEDULE"
	},
	{
		commands: ["покажи новости", "какие новости", "что нового"],
		type: "SHOW_NEWS"
	},
	{
		commands: ["пока", "закрыть", "завершить", "до свидания"],
		type: "EXIT"
	}
];

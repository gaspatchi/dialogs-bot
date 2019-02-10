import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Fuse from "fuse.js";
import config from "./config";
import showWelcomeMessage from "./commands/welcome";
import commands from "./commands";
import showUnknownMessage from "./commands/unknown";
import showExitMessage from "./commands/exit";
import showHelpMessage from "./commands/help";
import { searchSchedule, showGroupSchedule } from "./commands/schedule";
import { showLastNews } from "./commands/news";
import { createSession } from "./db/methods";
import _ from "lodash";
const fuse = new Fuse(commands, config.fuse);
const app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
	const { request, session, version } = ctx.request.body;
	if (session.new) {
		try {
			await createSession(session.session_id, { command: "new" });
		} catch (e) {
			console.error(e);
		}
	}
	let command = fuse.search(request.command);
	if (_.isEmpty(command)) {
		//let dbSession = await showSession(session.session_id);
		if (request.type === "SimpleUtterance") {
			await showWelcomeMessage(session, version, ctx);
		} else if (request.type === "ButtonPressed") {
			switch (request.payload.command) {
				case "SHOW_GROUP_SHEDULE":
					await showGroupSchedule(request.payload.group, version, session, ctx);
					break;
				case "GROUP_SCHEDULE":
					await searchSchedule(session, version, ctx);
					break;
				case "SHOW_NEWS":
					await showLastNews(session, version, ctx);
					break;
				default:
					await showUnknownMessage(session, version, ctx);
					break;
			}
		}
	} else {
		switch (command[0].type) {
			case "WELCOME":
				await showWelcomeMessage(session, version, ctx);
				break;
			case "HELP":
				await showHelpMessage(session, version, ctx);
				break;
			case "GROUP_SCHEDULE":
				await searchSchedule(session, version, ctx);
				break;
			case "SHOW_NEWS":
				await showLastNews(session, version, ctx);
				break;
			case "EXIT":
				await showExitMessage(session, version, ctx);
				break;
			default:
				await showUnknownMessage(session, version, ctx);
				break;
		}
	}
});

app.listen(8016);

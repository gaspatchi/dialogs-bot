import config from "../config";
import { fetchNews } from "../api/news";

export async function showLastNews(session, version, ctx) {
	try {
		let lastNews = await fetchNews();
		let buttons = [];
		for (let news of lastNews) {
			buttons.push({
				title: news.title.rendered,
				payload: {
					command: "SHOW_NEWS",
					news_id: news.id
				},
				url: `${config.site}/post/${news.id}`
			});
		}
		ctx.body = {
			version,
			session,
			response: {
				text: config.last_news,
				buttons,
				end_session: false
			}
		};
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
}

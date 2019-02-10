import config from "../config";
import axios from "axios";

export async function fetchNews() {
	let news = await axios.get(
		`${config.site}/api/wp/wp/v2/posts?categories=1&per_page=5`
	);
	return news.data;
}

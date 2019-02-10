import config from "../config";

export default async function showWelcomeMessage(session, version, ctx) {
	ctx.body = {
		version,
		session,
		response: {
			text: config.welcome_message,
			end_session: false
		}
	};
}

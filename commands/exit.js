import config from "../config";

export default async function showExitMessage(session, version, ctx) {
	ctx.body = {
		version,
		session,
		response: {
			text: config.exit_message,
			end_session: true
		}
	};
}

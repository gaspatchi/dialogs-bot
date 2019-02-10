import config from "../config";

export default async function showUnknownMessage(session, version, ctx) {
	ctx.body = {
		version,
		session,
		response: {
			text: config.unknown_command,
			end_session: false
		}
	};
}

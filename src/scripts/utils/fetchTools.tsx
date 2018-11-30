export default class fetchTools {
	public static readonly protocol = 'http';
	public static readonly api_name = process.env.URL;

	public static readonly admin_name = 'admin/';
	public static readonly election_name = 'election/';

	public static readonly api_url = fetchTools.protocol + '://' + fetchTools.api_name;

	public static call(api_query: string, isAdmin: boolean) {
		if (api_query.slice(-1) !== '/') {
			api_query = api_query + '/';
		}
		console.log(api_query);

		return fetchTools.api_url + (isAdmin ? fetchTools.admin_name : '') + api_query;
	}

}

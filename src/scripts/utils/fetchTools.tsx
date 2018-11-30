export default class fetchTools {
	public static readonly protocol = 'http';
	public static readonly api_name = process.env.URL;

	public static readonly admin_name = 'admin/';
	public static readonly election_name = 'election/';

	public static readonly api_url = fetchTools.protocol + '://' + fetchTools.api_name;

}

export const get = async (req) => {



	const slackmapAPIURL = `https://slackmap.com/api/v1/spots/clusters?${req.query.toString()}`;
	console.log(`slackmap url = ${slackmapAPIURL}`);
	const response = await fetch(slackmapAPIURL);
	const data = await response.json();

	//console.log(response);
	return {
		body: data
	};
};

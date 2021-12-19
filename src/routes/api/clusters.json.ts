import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
  const slackmapAPIURL = `https://slackmap.com/api/v1/spots/clusters?${req.query.toString()}`;
  //console.log(`slackmap url = ${slackmapAPIURL}`);
  const slackMapResponse = await fetch(slackmapAPIURL);

  //console.log(response);
  return {
    body: await slackMapResponse.json()
  };
};

import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
  const slackmapAPIURL = `https://slackmap.com/api/v1/spots/clusters/spots?${req.query.toString()}&zoom=19`;
  //console.log(`slackmap url = ${slackmapAPIURL}`);
  const response = await fetch(slackmapAPIURL);
  const data = await response.json();

  //console.log(response);
  return {
    body: data
  };
};

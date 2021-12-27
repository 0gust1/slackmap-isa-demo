import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
  const spotId = req.params?.id;
  console.log(`spotId !!! ${spotId}`)
  const slackmapAPIURL = `https://slackmap.com/api/v1/items/${spotId}/content`;
  //console.log(`slackmap url = ${slackmapAPIURL}`);
  const slackMapResponse = await fetch(slackmapAPIURL);
  return {
    body: await slackMapResponse.json()
  };
};

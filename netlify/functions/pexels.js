exports.handler = async function(event) {

  const query = event.queryStringParameters.query;

  const response = await fetch(
    `https://api.pexels.com/videos/search?query=${query}&per_page=5`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY
      }
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

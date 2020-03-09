const fetch = require('node-fetch');
const { URL } = require('url');

// API Url
const API_URL = 'https://data.winnipeg.ca/resource/tx3d-pfxq.json';

/**
 * Adds query paramters to url object
 * @param {URL} url URL object
 * @param {Obj} req Express Request Object
 */
function addQueryParams(url, req) {
  Object.keys(req.query).forEach((key) => {
    url.searchParams.append(key, req.query[key]);
  });
}

module.exports = async (req, res, next) => {
  // App token
  const APP_TOKEN = process.env.WINNIPEG_DATASET_API_KEY;

  // Creating URL Object
  const url = new URL(API_URL);

  // Adding app token as query parameter
  url.searchParams.append('$$app_token', APP_TOKEN);

  // Setting default limit to 50
  req.query.$limit = (req.query.$limit && req.query.$limit <= 300) ? req.query.$limit : 50;

  // Adding request query parameters to URL object
  addQueryParams(url, req);

  // Fetching results from API
  await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'Applcation/json',
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.message);
      }
      // Returning the response to client
      res.status(200);
      res.send(data);
    })
    .catch((err) => next(new Error(err)));
};

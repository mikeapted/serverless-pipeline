'use strict';
var moment = require('moment');

// Commented-out code is placeholder for authentication through API Gateway & Cognito.
// Pending until CORS through SAM is better supported.
// See: https://github.com/awslabs/serverless-application-model/issues/23


exports.handler = (event, context, callback) => {

  var originURL = process.env.ORIGIN_URL || '*';

  /*
  if (!event.requestContext.authorizer) {
    errorResponse('Authorization not configured', context.awsRequestId, callback);
    return;
  }
  const username = event.requestContext.authorizer.claims['cognito:username'];
  */

  emitLambdaAge();

  // This variable can be updated and checked in to your repository
  // to update the number of SAM squirrels on the screen.
  var samColor = process.env.BG_COLOUR || '#967da7';

  console.log('The background colour: ' + samColor);

  callback(null, {
      "statusCode": 200,
      "body": "\"" + samColor + "\"",
      "headers":
      {
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Origin": originURL
      }
  });
}

function emitLambdaAge() {
  var now = moment();
  var lambdaAnnouncement = moment('2014-11-04');

  var daysOld = now.diff(lambdaAnnouncement, 'days');

  console.log('Lambda is ' + daysOld + ' days old!');
}

/*
function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
*/

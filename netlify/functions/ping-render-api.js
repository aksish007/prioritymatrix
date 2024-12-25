const https = require('https');

exports.handler = async () => {
  return new Promise((resolve, reject) => {
    https.get('https://prioritymatrixserver.onrender.com/api/health', (resp) => {
      console.log('Ping successful');
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'Ping successful' }),
      });
    }).on('error', (err) => {
      console.error('Ping failed:', err.message);
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: err.message }),
      });
    });
  });
};

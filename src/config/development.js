const fs = require('fs');

const development = {
  server: {
    debug: {
      request: ['*'],
    },
    tls: {
      key: fs.readFileSync(`${__dirname}/../../localhost-key.pem`),
      cert: fs.readFileSync(`${__dirname}/../../localhost.pem`),
    },
  },
};

export default development;

const axios = require('axios');
const { logError } = require('../function/logError')

const hydrapanel = {
    url: process.env.PANEL_URL,
    key: process.env.PANEL_KEY
};

async function calculateResource(userID, resource) {
  let retries = 5; // Number of retry attempts
  let delay = 1000; // Initial delay in milliseconds
  
  const retryDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  while (retries > 0) {
      try {
          console.log("Starting resource calculation for user:", userID);
  
          const response = await axios.post(`${hydrapanel.url}/api/getUserInstance`, {
              userId: userID
          }, {
              headers: {
                  'x-api-key': `${hydrapanel.key}`,
                  'Content-Type': 'application/json'
              }
          });
  
          if (!response.data || !Array.isArray(response.data)) {
              throw new Error('Invalid response data format');
          }
  
          // Calculate total resources
          let totalResources = 0;
          response.data.forEach(server => {
              if (server[resource] !== undefined) {
                  let resourceValue = server[resource];
                  if (resource === 'Cpu') {
                      resourceValue *= 100;
                  }
                  totalResources += resourceValue;
              } else {
              }
          });
  
          return totalResources;

module.exports = { calculateResource };

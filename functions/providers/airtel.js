const axios = require('axios');
const functions = require('firebase-functions');

const AIRTEL_BASE = functions.config().airtel ? functions.config().airtel.base_url : process.env.AIRTEL_BASE_URL || 'https://openapiuat.airtel.africa';
const CLIENT_ID = functions.config().airtel ? functions.config().airtel.client_id : process.env.AIRTEL_CLIENT_ID;
const CLIENT_SECRET = functions.config().airtel ? functions.config().airtel.client_secret : process.env.AIRTEL_CLIENT_SECRET;

async function getToken(){
  const resp = await axios.post(`${AIRTEL_BASE}/oauth/token`, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials"
  });
  return resp.data.access_token;
}

async function initiateCollection({amount, phone, uid}){
  const token = await getToken();
  const payload = {
    amount: amount.toString(),
    currency: "UGX",
    externalId: `ASA:${uid}`,
    payer: {partyIdType: "MSISDN", partyId: phone},
    payerMessage: "ASA deposit",
    payeeNote: "ASA topup"
  };

  const resp = await axios.post(`${AIRTEL_BASE}/merchant/v1/transactions/collection`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return { message: "airtel-request-sent", data: resp.data || null };
}

module.exports = { initiateCollection };

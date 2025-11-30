const axios = require('axios');
const functions = require('firebase-functions');
const SUBSCRIPTION_KEY = functions.config().mtn ? functions.config().mtn.subscription_key : process.env.MTN_SUBSCRIPTION_KEY;
const API_USER = functions.config().mtn ? functions.config().mtn.api_user : process.env.MTN_API_USER;
const API_KEY = functions.config().mtn ? functions.config().mtn.api_key : process.env.MTN_API_KEY;
const MTN_BASE = functions.config().mtn ? functions.config().mtn.base_url : process.env.MTN_BASE_URL || 'https://sandbox.momodeveloper.mtn.com';

async function getAuthToken() {
  // Simplified; adapt to MTN exact flow
  const resp = await axios.post(`${MTN_BASE}/collection/token/`, {}, {
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY || '',
      "Authorization": `Basic ${Buffer.from(`${API_USER||''}:${API_KEY||''}`).toString('base64')}`
    }
  });
  return resp.data.access_token || resp.data.token;
}

async function initiateCollection({amount, phone, uid}) {
  const token = await getAuthToken();
  const referenceId = "asa-" + Date.now();
  const body = {
    amount: amount.toString(),
    currency: "UGX",
    externalId: `ASA:${uid}`,
    payer: { partyIdType: "MSISDN", partyId: phone },
    payerMessage: "ASA deposit",
    payeeNote: "ASA wallet topup"
  };

  const resp = await axios.post(`${MTN_BASE}/collection/v1_0/requesttopay`, body, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "X-Callback-Url": `${process.env.WEBHOOK_BASE || ''}/api/webhook/mtn`,
      "X-Reference-Id": referenceId,
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY || '',
      "Content-Type": "application/json"
    }
  });

  return { message: "request-sent", referenceId, status: resp.status, data: resp.data || null };
}

module.exports = { initiateCollection };

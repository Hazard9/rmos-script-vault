exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Method not allowed"
      })
    };
  }

  let licenseKey;

  try {
    const parsed = JSON.parse(event.body || "{}");
    licenseKey = (parsed.licenseKey || "").trim();
  } catch (err) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Bad request"
      })
    };
  }

  if (!licenseKey) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Enter a license key"
      })
    };
  }

  const productId = process.env.GUMROAD_PRODUCT_ID;

  if (!productId) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "License verification is not configured"
      })
    };
  }

  try {
    const params = new URLSearchParams();
    params.append("product_id", productId);
    params.append("license_key", licenseKey);
    params.append("increment_uses_count", "false");

    const gumroadRes = await fetch(
      "https://api.gumroad.com/v2/licenses/verify",
      {
        method: "POST",
        body: params
      }
    );

    const data = await gumroadRes.json();

    if (!data.success) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: "That license key did not match. Check it against your Gumroad receipt."
        })
      };
    }

    if (data.purchase && data.purchase.refunded) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: "This license was refunded."
        })
      };
    }

    if (data.purchase && data.purchase.chargebacked) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: "This purchase was disputed."
        })
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Could not reach the verification service. Try again shortly."
      })
    };
  }
};

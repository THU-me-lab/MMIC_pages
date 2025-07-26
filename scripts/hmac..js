const crypto = require("crypto");

const secret = "***";
const userId = "trusted-user";
const hash = crypto.createHmac("sha256", secret).update(userId).digest("hex");

console.log(hash);

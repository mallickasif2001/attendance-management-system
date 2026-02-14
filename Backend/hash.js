const bcrypt = require("bcrypt");

async function generate() {
  const hash = await bcrypt.hash("1234", 10);
  console.log(hash);
}

generate();

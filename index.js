const app = require("./src/app");
const db = require("./src/db/index");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`);
  });
}).catch((e) => {
  console.log(`Server not running. Error ${e.message}`);
});

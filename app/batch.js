const vorpal = require("./dist/cli/index.js");

vorpal.exec(`project set ${process.env.PRJ_ID}`).then(function(){
  vorpal.exec(`due -g due -m ${process.env.MS} -f S2`);
});

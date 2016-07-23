exports.setup = (agenda) => {
  agenda.define('show message', (job, done) => {
    console.log("Shows message.");
    done();
  });

  agenda.define('show message from site', (job, done) => {
    console.log(`Showing message from site with params: ${job}`);
    done();
  });
}

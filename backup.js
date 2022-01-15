const fs = require("fs");
const exec = require("child_process").exec;
const mongoose = require("mongoose");

function startBackUp(connectionString, dbOptions) {
  mongoose.connect(connectionString);
  mongoose.connection.on("open", function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, result) {
      if (err) throw err;

      for (let item of result) {
        getBackup(item.name);
      }
    });
  });

  function getBackup(collectionName) {
    var oldBackupPath;
    var newBackupDir = dbOptions.database + "-" + getDateString(new Date());

    // check for remove old backup after keeping # of days given in configuration
    if (dbOptions.removeDayBeforeBackup == true)
      oldBackupPath = `${__dirname}/${dbOptions.database}-${getDateString(
        new Date(Date.now() - 1000 * 60 * 60 * 24)
      )}`;

    const cmd =
      "mongoexport --db " +
      dbOptions.database +
      " --username=" +
      dbOptions.user +
      " --password=" +
      dbOptions.pass +
      " --collection=" +
      collectionName +
      " --out=" +
      newBackupDir +
      "/" +
      collectionName +
      ".json"; // Command for mongodb export process

    // console.log(cmd);
    exec(cmd, function (error, stdout, stderr) {
      if (error) throw error;

      if (dbOptions.removeDayBeforeBackup) {
        if (fs.existsSync(oldBackupPath)) {
          fs.rmdirSync(oldBackupPath);
        }
      }
    });
  }
}

function getDateString(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date.getUTCDate()
  );
}

module.exports = startBackUp;

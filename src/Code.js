/**
 * common functions to parse response and populate storage sheet
 *
 **/

function init(runMode, series) {
  Properties.setMode(runMode);
  Properties.set(PROPERTIES); // set properties (see config)
  Properties.setSeries(series); // set series
}

function copyLastResponse(runMode) {
  // assume that init()  was run previously
  Response.update(Properties.get(), true);
  Logger.log("copyLastResponse");
}
function copyIndex(index) {
  // assume that init()  was run previously
  Response.update(Properties.get(), RowProcessOptions.INDEX, index);
  Logger.log("Copy index", index, "completed");
}

function copyActive() {
  // assume that init()  was run previously
  Response.update(Properties.get(), RowProcessOptions.ACTIVE);
  Logger.log("Copy active completed");
}

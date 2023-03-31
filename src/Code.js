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

function getSheetValues(id, sheetName) {
  const sob = new SheetOb();
  sob.open(id, sheetName);
  const header = sob.getHeader();
  //  console.log(header);
  const values = sob.getValues();

  return [header, ...values];
}

function getSheetObjects(id, sheetName) {
  const sob = new SheetOb();
  sob.open(id, sheetName);
  // add event list here and return TBD

  return {
    name: sob.getName(),
    headerObject: sob.getHeaderOb(),
    header: sob.getHeader(),
    data: sob.getValues(),
  };
}

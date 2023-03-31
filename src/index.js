// test functions
function test() {
  console.log("Function Test()");
  //console.log(RACE_SERIES);
  //console.log(PROPERTIES);

  var mode;
  init(mode, SERIES.thursday);
  //init(RunMode.TEST, SERIES.thursday);

  console.log(Properties.getMode());
  console.log(Properties.getSeries());
  console.log(Properties.get());
}

function testEvent() {
  console.log("Function start");

  getEvents(WEB_API.runMode.test); // ...2023/voluntersDB

  console.log("Function completed");
}

function testEventSubscriptions() {
  console.log("Function TestApiObj()");

  const shObj = getEventSubscriptions(WEB_API.runMode.test); // ...2023/voluntersDB

  console.log("Function TestApiObj() completed");
}

function testAllDataObject() {
  console.log("Function start");
  const sob = new SheetOb();
  sob.open(PROPERTIES.test.target.id, "Sheet1"); // ...2023/voluntersDB
  const valObj = sob.getAllValuesObject();

  console.log("Function completed");
}

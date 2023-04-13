// test functions
function test() {
  console.log("Function Test()");
  //init(RunMode.TEST, SERIES.thursday);
  init(RunMode.TEST, SERIES.fall);
  copyLastResponse(RunMode.TEST);

  console.log(Properties.getMode());
  console.log(Properties.getSeries());
  console.log(Properties.get());
}

function testActiveRows() {
  console.log("Function testActiveRows");
  init(RunMode.TEST, SERIES.fall);
  copyActive();
  console.log("Function testActiveRows completed");
}
function testIndexRow() {
  console.log("Function testIndexRow");
  init(RunMode.TEST, SERIES.fall);
  copyIndex(2);
  console.log("Function testIndexRow completed");
}

function testEvent() {
  console.log("Function start");

  const events = getEvents(WEB_API.runMode.test); // ...

  console.log("Function completed");
}

function testEventSubscriptions() {
  console.log("Function TestApiObj()");

  const shObj = getEventSubscriptions(WEB_API.runMode.test); // ...

  console.log("Function TestApiObj() completed");
}

function testAllDataObject() {
  console.log("Function start");
  const sob = new SheetOb();
  sob.open(PROPERTIES.test.target.id, "Sheet1"); // ...
  const valObj = sob.getAllValuesObject();

  console.log("Function completed");
}

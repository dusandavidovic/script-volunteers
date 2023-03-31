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

function testApi() {
  console.log("Function TestApi()");

  getSheetValues(PROPERTIES.test.target.id, "Sheet1"); // ...2023/voluntersDB

  console.log("Function TestApi() completed");
}

function testApiObj() {
  console.log("Function TestApiObj()");

  const shObj = getSheetObjects(PROPERTIES.test.target.id, "Sheet1"); // ...2023/voluntersDB

  console.log("Function TestApiObj() completed");
}

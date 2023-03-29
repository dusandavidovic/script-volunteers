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

  doGet();
}

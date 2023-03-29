function doGet(e) {
  if (typeof e !== "undefined") {
    console.log("api-client doGet...parameters", JSON.stringify(e.parameters));
    console.log("api-client doGet...queryString", JSON.stringify(e.queryString));
    return ContentService.createTextOutput(JSON.stringify(e));
  } else {
    console.log("api-client doGet... Invalid call");
  }
}
// test fucntions
function doPost(e) {
  if (typeof e !== "undefined") {
    console.log.log("api-client doPost....", JSON.stringify(e));
    return ContentService.createTextOutput(JSON.stringify(e));
  }
}

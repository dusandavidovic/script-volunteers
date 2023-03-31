function doGet(e) {
  if (typeof e !== "undefined") {
    console.log("api-client doGet...parameters", JSON.stringify(e.parameters));
    //console.log("api-client doGet...queryString", JSON.stringify(e.queryString));
    const data = getSheetValues(e.parameter.id, e.parameter.sheet);
    console.log(data);
    return ContentService.createTextOutput(JSON.stringify(data));
  } else {
    console.log("api-client doGet... Invalid call");
  }
}

function doPost(e) {
  if (typeof e !== "undefined") {
    console.log("api-client doPost....", JSON.stringify(e));
    console.log(e.parameter.action);
    switch (e.parameter.action) {
      case "getSheet":
        const data = getSheetValues(e.parameter.id, e.parameter.sheet);
        break;
      case "getSheetObject":
        data = getSheetObjects(e.parameter.id, e.parameter.sheet);
        break;
      default:
        data = getSheetValues(e.parameter.id, e.parameter.sheet);
        break;
    }
    console.log(data);
    return ContentService.createTextOutput(JSON.stringify(data));
  } else {
    console.log("api-client doPost... Invalid call");
  }
}

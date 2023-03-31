function doGet(e) {
  if (typeof e !== "undefined") {
    console.log("api-client doGet...parameters", JSON.stringify(e.parameters));
    const data = getEventSubscriptions(e.parameter.mode);

    // if (e.parameters.action === WEB_API.actions.event) {
    // } else {
    //   if (e.parameters.action === WEB_API.actions.getEventSubscriptions) {
    //     const data = getEventSubscriptions(e.parameter.mode);
    //   }
    // }

    return ContentService.createTextOutput(JSON.stringify(data));

    console.log("api-client doGet...completed");
  } else {
    console.log("api-client doGet... Invalid call");
  }
}

function doPost(e) {
  if (typeof e !== "undefined") {
    console.log("api-client doPost....", JSON.stringify(e));
    // console.log(e.parameter.action);
    // switch (e.parameter.action) {
    //   case "getSheet":
    //     const data = getSheetValues(e.parameter.id, e.parameter.sheet);
    //     break;
    //   case "getSheetObject":
    //     data = getSheetObjects(e.parameter.id, e.parameter.sheet);
    //     break;
    //   default:
    //     data = getSheetValues(e.parameter.id, e.parameter.sheet);
    //     break;
    // }
    // console.log(data);
    return ContentService.createTextOutput(JSON.stringify(e));
    console.log("api-client doPost...completed");
  } else {
    console.log("api-client doPost... Invalid call");
  }
}

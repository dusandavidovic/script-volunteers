/**
 * functions executed from doGet/doPost, call from another APP
 * STILL IN  DEVELOPMENT/TEST stage
 **/

// TEST - Returns only header
function getEvents(runMode) {
  // DO NOT USE -
  const sob = new SheetOb();
  if ((runMode = WEB_API.runMode.test)) {
    sob.open(WEB_API.test.events.id, WEB_API.test.events.sheets.header);
  } else {
    sob.open(WEB_API.production.events.id, WEB_API.production.events.sheets.header);
  }

  // return [header, ...values];
  return {
    name: sob.getName(),
    header: sob.getHeader(),
    values: sob.getValues(),
    headerObject: sob.getHeaderOb(),
    valuesObject: sob.getAllValuesObject(),
  };
}

function getEventSubscriptions(runMode) {
  const sob = new SheetOb();
  if ((runMode = WEB_API.runMode.test)) {
    sob.open(WEB_API.test.eventSubscriptions.id, WEB_API.test.eventSubscriptions.sheets.main);
  } else {
    sob.open(
      WEB_API.production.eventSubscriptions.id,
      WEB_API.production.eventSubscriptions.sheets.main
    );
  }

  return {
    name: sob.getName(),
    header: sob.getHeader(),
    values: sob.getValues(),
    headerObject: sob.getHeaderOb(),
    valuesObject: sob.getAllValuesObject(),
  };
}

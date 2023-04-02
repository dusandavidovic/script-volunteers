const MapFormResponses = {
  timestamp: "timestamp",
  email: "email",
  //firstName: "firstName",
  //lastName: "lastName",
  mobileNumber: "mobile",
  // reminder: 5,
  // selectRaces: 6,
  // comment: 7,
  participatingInSkipperProgram: "skipperProgram",
  boatName: "boatName",
  numberOfPeople: "crewCount",
  task: "task",
};

const EventSubscriptions = {
  id: 0,
  timestamp: "",
  eventDate: "",
  formatedEventDate: "",
  event: "",
  name: "",
  email: "",
  mobile: "",
  task: "",
  skipperProgram: "",
  boatName: "",
  crewCount: 0,
};

function formToSubscription(fromHdr, fromRowObj, toHdr, race) {
  const mapper = new Mapper(MapFormResponses);
  const resultRow = mapper.mapEntry(fromRowObj);
  // compound or conditional fields
  resultRow.name = `${fromRowObj.lastName?.toUpperCase()},${fromRowObj.firstName?.toUpperCase()}`;
  resultRow.boatName.toUpperCase();
}

class Mapper {
  // fieldMap = {};
  constructor(fieldMap) {
    this.fieldMap = fieldMap;
  }

  /*
   * Maps array of JSON objects to another array
   */
  mapEntries(entries) {
    const newEntries = [];
    entries.forEach((entry) => {
      const mappedEntry = mapEntry(entry);
      newEntries.push(mappedEntry);
    });
    return newEntries;
  }
  /*
   * Maps one JSON object to another
   */
  mapEntry(entry) {
    let line = {};
    for (let fld in this.fieldMap) {
      const key = this.fieldMap[fld];
      line[key] = entry[fld];
    }
    return line;
  }
}

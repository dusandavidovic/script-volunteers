/*
 * all enums are declared here... see bellow for example
 */

/*
 * Sample ENUM
 * Then use it like so:
 * var mySize = SizeEnum.MEDIUM;
 *var myCode = SizeEnum.properties[mySize].code; // myCode == "M"
 */
var SizeEnum = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  properties: {
    1: { name: "small", value: 1, code: "S" },
    2: { name: "medium", value: 2, code: "M" },
    3: { name: "large", value: 3, code: "L" },
  },
};

/*
 * MODE
 * define TEST and PRODUCTION mode
 */
var RunMode = {
  TEST: 1,
  PROD: 2,
  properties: {
    1: { name: "Test", value: 1, code: "T" },
    2: { name: "Production", value: 2, code: "P" },
  },
};

/*
 * YesNo
 * Defines Yes/No values
 */
var YesNo = {
  NO: 0,
  YES: 1,
  properties: {
    0: { name: "No", value: 0, code: "N" },
    1: { name: "Yes", value: 1, code: "Y" },
  },
};

/*
 *
 * Defines selection values for row processing
 */
var RowProcessOptions = {
  ALL: 0,
  LAST: 1,
  ACTIVE: 2,
  INDEX: 3,
  properties: {
    0: { name: "All", value: 0, code: "ALL" },
    1: { name: "Last", value: 1, code: "LAST" },
    2: { name: "Active", value: 2, code: "ACTIVE" },
    3: { name: "Index", value: 3, code: "INDEX" },
  },
};

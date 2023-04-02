/*
 ** Constants that are used in library mode, for populating DB
 */
const PROPERTIES = {
  prod: {
    source: {
      //  always take first sheet:
      tuesday: "1jjBVRV4fhs8qt8H_jfc6HnFB7MeNqNO9wFyGdeiFecE", //  /My Drive/racing@BHYC/volunteersManagement/2023/tuesdaySeriesSubscription (Responses)
      thursday: "1oUfXdEIeJK8LI3-RaTRCUziqB1Rt4GV7fjBUb9jst_s", // .../racing@BHYC/volunteersManagement/2023/VolunteersThursday (Responses)
      fall: "1jYzj0mTuOwu4jnYUKmkaYjxoSg2shUte5SQVayZV1A8", // .../racing@BHYC/volunteersManagement/2023/fallSeriesSubscription (Responses)
    },
    target: {
      //  always take first sheet:
      id: "1YJM8O7pyAsv9Y8J8I5EGFoYR-6t8UKIeV7Gzf8tnx0Y", // .../racing@BHYC/volunteersManagement/2023/eventSubscription
      cal: "Event Subscription", //calendar name
    },
    events: {
      id: "18oPo8OKxAtQX8KYCbYQBzsAyuU-jX0vpFwvGIWjKT_o", // /My Drive/racing@BHYC/volunteersManagement/2023/events
      sheets: {
        header: "header",
        detail: "detail",
      },
    },
  },
  test: {
    source: {
      //  always take first sheet:
      tuesday: "1jjBVRV4fhs8qt8H_jfc6HnFB7MeNqNO9wFyGdeiFecE", //  /My Drive/racing@BHYC/volunteersManagement/2023/tuesdaySeriesSubscription (Responses)
      thursday: "1oUfXdEIeJK8LI3-RaTRCUziqB1Rt4GV7fjBUb9jst_s", // .../racing@BHYC/volunteersManagement/2023/VolunteersThursday (Responses)
      fall: "1jYzj0mTuOwu4jnYUKmkaYjxoSg2shUte5SQVayZV1A8", // .../racing@BHYC/volunteersManagement/2023/fallSeriesSubscription (Responses)
    },
    target: {
      //  always take first sheet:
      id: "1YJM8O7pyAsv9Y8J8I5EGFoYR-6t8UKIeV7Gzf8tnx0Y", // .../racing@BHYC/volunteersManagement/2023/eventSubscription
      cal: "Event Subscription", //calendar name
    },
    events: {
      id: "18oPo8OKxAtQX8KYCbYQBzsAyuU-jX0vpFwvGIWjKT_o", // /My Drive/racing@BHYC/volunteersManagement/2023/events
      sheets: {
        header: "header",
        detail: "detail",
      },
    },
  },
};

const RACE_SERIES = {
  races2016: "1rdT0BPSFK2IxVltbQOfZfCDt5C834YxpmKHLZH4-Ms8", //races2016 spreadsheet
  races: "1KZjVMoItXqdaFU8DEUOcuqeMe8hWxSTC2pY7OkSn3sM", ///My Drive/racing@BHYC/controlFiles/races
};

const APP_NAME = "rcVolunteer";

//const SERIES = {
var SERIES = {
  tuesday: "tuesday",
  thursday: "thursday",
  fall: "fall",
};

/*
 ** Constants that are used in WEB_API mode (script executed from another app)
 */
const WEB_API = {
  runMode: {
    test: 1,
    prod: 2,
  },
  actions: {
    event: 1,
    eventSubs: 2,
  },
  production: {
    events: {
      id: "18oPo8OKxAtQX8KYCbYQBzsAyuU-jX0vpFwvGIWjKT_o", // /My Drive/racing@BHYC/volunteersManagement/2023/events
      sheets: {
        header: "header",
        detail: "detail",
        task: "task",
        ranger: "ranger", //for using Form Ranger
      },
    },
    eventSubscriptions: {
      id: "18Nsn_ky8clUSAYbJaH6kwaidqGRKIBoZdLP9WfbMF5s", // .../racing@BHYC/volunteersManagement/2023/volunteersDB
      sheets: {
        main: "Sheet1",
        counter: "counter",
      },
    },
  },
  test: {
    events: {
      id: "18oPo8OKxAtQX8KYCbYQBzsAyuU-jX0vpFwvGIWjKT_o", // /My Drive/racing@BHYC/volunteersManagement/	2023/events
      sheets: {
        header: "header",
        detail: "detail",
        task: "task",
        ranger: "ranger", //for using Form Ranger
      },
    },
    eventSubscriptions: {
      id: "1YJM8O7pyAsv9Y8J8I5EGFoYR-6t8UKIeV7Gzf8tnx0Y", // .../racing@BHYC/volunteersManagement/2023/evantSubscription
      sheets: {
        main: "main",
        counter: "counter",
      },
    },
  },
};

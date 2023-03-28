const PROPERTIES = {
  prod: {
    source: {
      //  always take first sheet:
      tuesday: "1YYGHdMdE7OSjLpO3RIwJL0MyUbO9-hAxk8pgoPV_6ro", // .../volunteersManagement/raceVolunteersTuesday (Response)
      thursday: "1sDRZEQW7Ieu9dXQAUbI9SPhDOsI8EHr2zjCgcRwcuy8", // .../volunteersManagement/raceVolunteersThursday (Responses)
      fall: "1xq6MOh8RiDMkKGIsh6WWxA4OsU_0VdxSfsz_TgE95gg", // .../volunteersManagement/raceVolunteersFall (Responses)
    },
    target: {
      //  always take first sheet:
      id: "1bPH3AFO5ZPq4CpWi6AA-YuGmthwPDAyQDQXhsIeqdRU", // .../volunteersManagement/raceVolunteers
      cal: "Event Subscription", //calendar name
    },
  },
  test: {
    source: {
      //  always take first sheet:

      tuesday: "", //
      thursday: "1oUfXdEIeJK8LI3-RaTRCUziqB1Rt4GV7fjBUb9jst_s", // .../racing@BHYC/volunteersManagement/2023/VolunteersThursday (Responses)
      fall: "", // ...
    },
    target: {
      //  always take first sheet:
      id: "18Nsn_ky8clUSAYbJaH6kwaidqGRKIBoZdLP9WfbMF5s", // .../racing@BHYC/volunteersManagement/2023/volunteersDB
      cal: "Event Subscription", //calendar name
    },
  },
};

const RACE_SERIES = {
  races2016: "1rdT0BPSFK2IxVltbQOfZfCDt5C834YxpmKHLZH4-Ms8", //races2016 spreadsheet
  races: "1KZjVMoItXqdaFU8DEUOcuqeMe8hWxSTC2pY7OkSn3sM", ///My Drive/racing@BHYC/controlFiles/races
};

const APP_NAME = "rcVolunteer";

const SERIES = {
  tuesday: "tuesday",
  thursday: "thursday",
  fall: "fall",
};

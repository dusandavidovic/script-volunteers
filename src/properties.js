var Properties = (function (properties) {
  "use strict";

  let runMode = "";
  /**
   * get the service to use
   * @return {PropertiesService}
   */
  properties.getService = function () {
    return PropertiesService.getUserProperties();
  };
  /**
   * get the properties for this app
   * @return {object | null} the properties
   */
  properties.get = function () {
    var prop = properties.getService().getProperty(APP_NAME);
    return prop ? JSON.parse(prop) : null;
  };

  /**
   * set the properties for this app
   * @param {object} props the properties for this app
   * @return {object} the properties
   */
  properties.set = function (props) {
    properties
      .getService()
      .setProperty(
        APP_NAME,
        JSON.stringify(properties.getMode() === RunMode.TEST ? props.test : props.prod)
      );
    return props;
  };
  /**
   * set the SERIES property
   * @param service current service for this app
   * @return null
   */
  properties.setSeries = function (series) {
    properties.getService().setProperty("currentSeries", series);
  };

  properties.setMode = function (mode) {
    runMode = !mode ? RunMode.TEST : mode;
    console.log("Run mode is set to:", RunMode.properties[runMode].name);
  };
  properties.getMode = () => {
    return runMode;
  };

  /**
   * get the current SERIES property
   * @return {object | null} current series
   */
  properties.getSeries = function () {
    return properties.getService().getProperty("currentSeries");
  };

  return properties;
})(Properties || {});

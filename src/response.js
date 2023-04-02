/**
 * Main functionlity...
 *   Get Response from Source
 *   Update target
 **/

var Response = (function (response) {
  /**
   * open a book given its id
   * @param {string} id the id
   * @return {Spreadsheet} the workbook
   */
  response.openWorkbook = function (id) {
    return SpreadsheetApp.openById(id);
  };

  /**
   * update the target workbook with the contents of the update
   * @param {object} props the properties
   */
  response.update = function (props, rowProcessOption, rowIndex) {
    // open the response from sheet
    var fs = response
      .openWorkbook(response.getSourceId(props, Properties.getSeries()))
      .getSheets()[0];
    // open the target sheet
    var ts = response.openWorkbook(props.target.id).getSheets()[0];

    //
    switch (rowProcessOption) {
      case RowProcessOptions.ACTIVE:
        const processRow = fs.getActiveRange().getValues()[0];
        response.updateRow(Util.getHeaderObj(fs), Util.getHeaderObj(ts), processRow);
        break;
      case RowProcessOptions.LAST:
        response.updateLastRow(fs, ts);
        break;
      case RowProcessOptions.ALL:
        response.updateAll(fs, ts);
        break;
      case RowProcessOptions.INDEX:
        processRow = fs.getRange(rowIndex, 1, 1, fs.getLastColumn()).getValues()[0];
        response.updateRow(Util.getHeaderObj(fs), Util.getHeaderObj(ts), processRow);
        break;
      default:
        break;
    }
  };

  /**
   * update the response workbook with the contents of the row
   * @param {HeaderObject}  FROM sheet header
   * @param {HeaderObject}  TO sheet header
   * @param [processRow] from row values
   */
  response.updateRow = function (fsHeaderOb, tsHeaderOb, processRow) {
    // parse Select races and than compare to Series info
    // and create row per race !!!
    var newRows = response.processOneResponse(processRow, fsHeaderOb, tsHeaderOb);
    for (i in newRows) {
      if (newRows[i]) ts.appendRow(newRows[i]); // add row to target
    }
    // when requested add calendar reminder
    if (processRow[fsHeaderOb.reminder] === "Yes") {
      try {
        var props = Properties.get();
        response.addReminder(props.target.cal, tsHeaderOb, newRows);
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };

  /**
   * update the targete workbook with the contents of last row
   * @param {Sheet} fs the response sheet
   * @param {Sheet} ts the update sheet
   */
  response.updateLastRow = function (fs, ts) {
    // get last row & header from response/source
    var fsLastRow = fs.getRange(fs.getLastRow(), 1, 1, fs.getLastColumn()).getValues()[0];
    var fsHead = fs.getRange(1, 1, 1, fs.getLastColumn()).getValues()[0]; // from header row
    var tsHead = ts.getRange(1, 1, 1, ts.getLastColumn()).getValues()[0]; // target header row
    // make header objects so we know where are columns
    var tsHeaderOb = Util.makeHeaderOb(tsHead);
    var fsHeaderOb = Util.makeHeaderOb(fsHead);

    // parse Select races and than compare to Series info
    // and create row per race !!!
    var newRows = response.processOneResponse(fsLastRow, fsHeaderOb, tsHeaderOb, ts.getLastRow());
    for (i in newRows) {
      if (newRows[i]) ts.appendRow(newRows[i]); // add row to target
    }
    // when requested add calendar reminder
    if (fsLastRow[fsHeaderOb.reminder] === "Yes") {
      try {
        var props = Properties.get();
        response.addReminder(props.target.cal, tsHeaderOb, newRows);
      } catch (error) {
        console.log(error);
      }
    }
    return 1;
  };
  /**
   * process one response, append one row per race to target sheet
   * @param {row} response row
   * @param {object} response header
   * @param {object} target header
   */
  response.processOneResponse = function (lastRow, fromHdr, toHdr, toNumberOfRows) {
    var rs = new RaceSeries().getSerie(Properties.getSeries()); //race series info, see races2016 sheet
    var races = lastRow[fromHdr.selectRaces].split(","); //response - selected races
    var rows = [];
    var id = toNumberOfRows - 1; // remove header
    for (var i in races) {
      var lookup = rs[1].filter(function (row, idx) {
        return races[i].trim() == row[2];
      });

      if (lookup.length > 0) {
        // only when match is found...perform mapping
        var row = response.mapLine(toHdr, fromHdr, lookup[0], lastRow, ++id);
        rows.push(row);
      }
    }
    return rows;
  };

  response.mapLine = function (toHdr, fromHdr, race, fromRow, index) {
    let row = [];

    row[toHdr.id] = index;
    row[toHdr.event] = race[0];
    row[toHdr.eventDate] = race[1];
    row[toHdr.formatedEventDate] = race[2];

    row[toHdr.timestamp] = fromRow[[fromHdr.timestamp]];
    row[toHdr.name] = // fromRow[[fromHdr.lastName]]
      //   ? fromRow[[fromHdr.lastName]] + ", " + fromRow[[fromHdr.firstName]]
      //   : fromRow[[fromHdr.firstName]]
      (
        !fromRow[[fromHdr.lastName]]
          ? fromRow[[fromHdr.firstName]]
          : fromRow[[fromHdr.lastName]] + ", " + fromRow[[fromHdr.firstName]]
      ).toUpperCase();
    row[toHdr.email] = fromRow[[fromHdr.email]];
    row[toHdr.task] = fromRow[[fromHdr.task]];

    row[toHdr.skipperProgram] = fromRow[[fromHdr.participatingInSkipperProgram]];
    row[toHdr.boatName] = fromRow[[fromHdr.boatName]].toUpperCase();
    row[toHdr.crewCount] = fromRow[[fromHdr.numberOfPeople]];
    row[toHdr.mobile] = fromRow[[fromHdr.mobileNumber]];

    if (row[toHdr.skipperProgram] !== "Yes") row[toHdr.crewCount] = 1;

    return row;
  };

  /**
   * Add reminder to calendar
   * @param {string} calendar name
   * @param {object} header object
   * @param {array} data
   */
  response.addReminder = function (calName, head, data) {
    var crsCal = new Calendar(calName);
    for (i in data) {
      crsCal.findEvent(data[i][head.eventDate], "series"); //there is always series in title of event
      crsCal.addGuest(data[i][head.email]);
      crsCal.addEmailReminder(1440);
    }
  };
  /**
   * update the response workbook with the contents of the update
   * @param {Sheet} fs the response sheet
   * @param {Sheet} ts the update sheet
   */
  response.updateAll = function (fs, ts) {};

  response.getSourceId = function (props, name) {
    return props.source[name.toLowerCase()];
  }; //getSourceId

  return response;
})(Response || {});

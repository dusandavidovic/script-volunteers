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
    let processRow = [];
    switch (rowProcessOption) {
      case RowProcessOptions.ACTIVE:
        processRow = fs.getActiveRange().getValues()[0];
        response.updateRow(Util.getHeaderObj(fs), ts, Util.getHeaderObj(ts), processRow);
        break;
      case RowProcessOptions.LAST:
        response.updateLastRow(fs, ts);
        break;
      case RowProcessOptions.ALL:
        response.updateAll(fs, ts);
        break;
      case RowProcessOptions.INDEX:
        processRow = fs.getRange(rowIndex, 1, 1, fs.getLastColumn()).getValues()[0];
        response.updateRow(Util.getHeaderObj(fs), ts, Util.getHeaderObj(ts), processRow);
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
  response.updateRow = function (fsHeaderOb, ts, tsHeaderOb, processRow) {
    // parse Select races and than compare to Series info
    // and create row per race !!!
    var newRows = response.processOneResponse(processRow, fsHeaderOb, tsHeaderOb);
    for (i in newRows) {
      if (newRows[i]) ts.appendRow(newRows[i]); // add row to target
    }

    // sort sheet by Event Date ascending, series descending
    ts.getRange(2, 1, ts.getLastRow(), ts.getLastColumn()).sort({
      column: 10,
      ascending: true,
    });
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
    // sort sheet by Event Date ascending, series descending
    ts.getRange(2, 1, ts.getLastRow(), ts.getLastColumn()).sort({
      column: 10,
      ascending: true,
    });

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

    row[toHdr.series] = Properties.getSeries();
    row[toHdr.id] = index;
    row[toHdr.event] = race[0];
    row[toHdr.eventDate] = race[1];
    //row[toHdr.formatedEventDate] = race[2];
    row[toHdr.date] = race[2];

    row[toHdr.timestamp] = fromRow[[fromHdr.timestamp]];
    row[toHdr.name] = Util.capitalizeFirstLetters(
      !fromRow[[fromHdr.lastName]]
        ? fromRow[[fromHdr.firstName]]
        : fromRow[[fromHdr.lastName]] + ", " + fromRow[[fromHdr.firstName]]
    );
    row[toHdr.email] = fromRow[[fromHdr.email]];
    row[toHdr.task] = fromRow[[fromHdr.task]];

    row[toHdr.skipperProgram] = fromRow[[fromHdr.participatingInSkipperProgram]];
    row[toHdr.boat] = Util.capitalizeFirstLetters(fromRow[[fromHdr.boatName]]);
    row[toHdr.crewCount] = fromRow[[fromHdr.numberOfPeople]];

    let phone = fromRow[[fromHdr.mobileNumber]].toString();
    row[toHdr.mobile] = phone.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // format phone number

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
  response.updateAll = function (fs, ts) {
    var fsLastRow = fs.getRange(fs.getLastRow(), 1, 1, fs.getLastColumn()).getValues()[0];

    var fsData = fs.getDataRange().getValues();
    var fsHead = values_.shift();

    var tsHead = ts.getRange(1, 1, 1, ts.getLastColumn()).getValues()[0]; // target header row
    // make header objects so we know where are columns
    var tsHeaderOb = Util.makeHeaderOb(tsHead);
    var fsHeaderOb = Util.makeHeaderOb(fsHead);

    // delete all target data for this series
    // create new rows
    fsData.forEach((fsRow) => {
      var newRows = response.processOneResponse(fsRow, fsHeaderOb, tsHeaderOb, ts.getLastRow());
      // add multiple rows TBD
    });
    //var newRows = response.processOneResponse(fsLastRow, fsHeaderOb, tsHeaderOb, ts.getLastRow());
    // for (i in newRows) {
    //   if (newRows[i]) ts.appendRow(newRows[i]); // add row to target
    // }
    // sort sheet by Event Date ascending, series descending
    ts.getRange(2, 1, ts.getLastRow(), ts.getLastColumn()).sort({
      column: 11,
      ascending: true,
    });

    // // when requested add calendar reminder
    // if (fsLastRow[fsHeaderOb.reminder] === "Yes") {
    //   try {
    //     var props = Properties.get();
    //     response.addReminder(props.target.cal, tsHeaderOb, newRows);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    return 1;
  };

  response.getSourceId = function (props, name) {
    return props.source[name.toLowerCase()];
  }; //getSourceId

  return response;
})(Response || {});

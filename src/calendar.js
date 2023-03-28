/**
 * Namespace to deal with Calendar events
 * specifically for Club Racing
 *
 **/
class Calendar {
  constructor(calName) {
    "use strict";

    var self = this;

    var cal_,
      name_ = calName,
      currEvent_;
    /**
     * open calendar
     * @return {} calendar
     */
    self.open = function () {
      if (!cal_) {
        var cal = CalendarApp.getCalendarsByName(name_).filter(function (calendar) {
          return name_ == calendar.getName();
        })[0];
        if (!cal) {
          throw new Error("could not find calendar " + name_);
        }
        cal_ = cal;
      }
      return cal_;
    };

    self.findEvent = function (date, searchTitle) {
      if (!cal_) self.open();
      var events = cal_.getEventsForDay(new Date(date)); //all events for a day

      //  Specific search for club series
      currEvent_ = events.filter(function (ev) {
        return ev.getTitle().toLowerCase().search(searchTitle) < 0 ? false : true;
      })[0];
      return self;
    };

    self.addGuest = function (email) {
      if (!currEvent_) {
        throw new Error("Event not found, please run findEvent() first");
      } else {
        var guests = currEvent_.getGuestList();

        if (
          !guests.some(function (ev) {
            return ev.getEmail() == email;
          })
        )
          currEvent_.addGuest(email);

        //      if (!found) currEvent_.addGuest(email);
      }
    };

    self.removeGuest = function (email) {
      if (!currEvent_) {
        throw new Error("Event not found, please run findEvent() first");
      } else {
        var guests = currEvent_.getGuestList();
        if (
          guests.some(function (ev) {
            return ev.getEmail() == email;
          })
        )
          currEvent_.removeGuest(email);
      }
    };

    self.addEmailReminder = function (min) {
      if (!currEvent_) {
        throw new Error("Event not found, please run findEvent() first");
      } else {
        var ss = currEvent_.getEmailReminders()[0];
        if (ss != min) currEvent_.removeAllReminders().addEmailReminder(min);
      }
    };

    return self;
  }
}

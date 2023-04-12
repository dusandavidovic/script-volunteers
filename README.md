# script-volunteers

Library that facilitates transfer form goolge form response to another cumulative sheet

### Current functions:

* For Event Subscription process, takes data from one spreadsheet, reformats and saves into another.


### Google Drive implementation:

- Script Name: volunteerLibrary
- Script ID: 1fKdo1__SWa4qlRHf7bF3pQwzSk0xEIoa8a01v_Ex3o7JM0zbNawfjchc
- Library include: vLib

### How to use

In Google Forms response sheet, create apps script and add library above.
Then you can use library:
- Add new menu
```
function onOpen(e) {
  createMenu();
}
function createMenu() {
   SpreadsheetApp.getUi().createMenu("Actions")
    .addItem("Copy all", "copyAllEntries")
    .addItem("Copy last", "copyLastRow")
    .addItem("Copy active", "copyActiveRows")
    .addToUi();
}
```
- Create triger onFormSubmit...
```
function onFormSubmit(e) {
  console.log('onFormSubmit: e=',e);
  vLib.init(vLib.RunMode.PROD, vLib.SERIES.thursday)
  vLib.copyLastResponse(vLib.RunMode.PROD);
}
```

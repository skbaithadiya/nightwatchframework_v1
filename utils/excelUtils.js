const excel = require('exceljs');
var logger = require('./logger');
var log = logger.logger();

module.exports = function(filename) {
    // reading data from excel file
    this.excelRead = function(sheetname, tc_id, column_header){
        var data = undefined;
        const workbook = new excel.Workbook();
        return workbook.xlsx.readFile(filename)
            .then(function(){
                const sheet = workbook.getWorksheet(sheetname);
                var colNo = getColumnNumber(sheet, column_header);
                log.info(`Column Number by column_header: ${colNo}`)
                var rowNo = getRowNumber(sheet, tc_id);
                log.info(`Row Number by tc_id: ${rowNo}`);
                data = sheet.getRow(rowNo).getCell(colNo).value;
                log.info(`Read data: ${data} from file ${filename} and sheet name: ${sheetname}`);
                // console.log(`data: ${data}`);
                return data;
            });
    },
    // writing data in excel file
    this.excelWrite = function(sheetname, tc_id, column_header, result){
        const workbook = new excel.Workbook();
        return workbook.xlsx.readFile(filename)
            .then(function(){
                const sheet = workbook.getWorksheet(sheetname);
                var colNo = getColumnNumber(sheet, column_header);
                var rowNo = getRowNumber(sheet, tc_id);
                sheet.getRow(rowNo).getCell(colNo).value = result;
                workbook.xlsx.writeFile(filename);
                log.info(`Set Result to TC: ${tc_id}, Result: ${result} [file ${filename} and sheet name: ${sheetname}]`);
                return true;
            });
        // return this;
    },
    // reading entire column data from excel file by column_header name
    this.excelReadEntireColumn = function(sheetname, column_header){
        var data = undefined;
        const workbook = new excel.Workbook();
        return workbook.xlsx.readFile(filename)
            .then(function(){
                const sheet = workbook.getWorksheet(sheetname);
                var colNo = getColumnNumber(sheet, column_header);
                log.info(`Column Number by column_header: ${colNo}`)
                var colData = [];
                for(var data=2; data<=sheet.actualColumnCount; data++){
                    cellData = sheet.getRow(data).getCell(colNo).value;
                    if(cellData !== null){
                        colData.push(sheet.getRow(data).getCell(colNo).value);
                    }
                }
                log.info(`Read data: ${colData} from file ${filename} and sheet name: ${sheetname}`);
                return colData;
            });
    }
    return this;
}

function getColumnNumber(sheet, headerName){
    for(var i=1; i<=sheet.actualRowCount; i++){
        for(var j=1; j<=sheet.actualColumnCount; j++){
            if(sheet.getRow(i).getCell(j).value === headerName){
                // console.log(`column no: ${j}`);
                return j
            }
        }
    }

}
function getRowNumber(sheet, tc_id){
    for(var i=1; i<=sheet.actualRowCount; i++){
        for(var j=1; j<=sheet.actualColumnCount; j++){
            if(sheet.getRow(j).getCell(i).value === tc_id){
                // console.log(`row no: ${j}`);
                return j;
            }
        }
    }
}
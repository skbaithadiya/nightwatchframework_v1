var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var logger = require('./utils/logger');
var log = logger.logger();

module.exports = {
  write : function(results, options, done) {

    // var reportFilename = options.filename_prefix + (Math.floor(Date.now() / 1000)) + '.html';
    // var reportFolder = options.output_folder // un-comment and it will generate reports into tests_output folder
    var reportFilename = options.filename_prefix + Date.now() + '.html';
    var reportFolder = './reports';
    var reportFilePath = path.join(__dirname, reportFolder, reportFilename);

    // read the html template
    fs.readFile('html-reporter.hbs', function(err, data) {
      if (err) throw err;

      var template = data.toString();

      // merge the template with the test results data
      var html = handlebars.compile(template)({
        results   : results,
        options   : options,
        timestamp : new Date().toString(),
        browser   : options.filename_prefix.split('_').join(' ')
      });

      // write the html to a file
      fs.writeFile(reportFilePath, html, function(err) {
        if (err) throw err;
        console.log('Report generated: ' + reportFilePath);
        log.info('HTML Report generated: ' + reportFilePath);
        done();
      });
    });
  }
};
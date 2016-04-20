var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');
// array of URLs
var URLs = ['https://www.rentomojo.com/bangalore?_escaped_fragment_=','https://www.rentomojo.com/mumbai?_escaped_fragment_=','https://www.rentomojo.com/pune?_escaped_fragment_=','https://www.rentomojo.com/delhi?_escaped_fragment_=','https://www.rentomojo.com/noida?_escaped_fragment_=','https://www.rentomojo.com/gurgaon?_escaped_fragment_='];
// this function runs 5 async requests at a time concurrency=1
async.mapLimit(URLs, 5, function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var $ = cheerio.load(xhr.responseText),
              links = $('a');
          var str = "Text,URL\n";
          links.each(function (i, link) {
            //extracting text and href attribute of <a> tags
            var url = $(link).attr("href");
            var text = $(link).text();
            if(!(url == undefined)){
              // check for href="undefined" and remove them
              str += text+","+url+"\n";
            }
          });
          callback(null, str);
        }
      };
}, function(err, results) {
    // completion function
    if (!err) {
        // processing all results in the array here
        for (var i = 0; i < results.length; i++) {
            // writing them to output.csv file
            fs.writeFile('output.csv', results[i], function(err){
              if(err){
                console.log(err);
              }
              console.log('File successfully written! - Check your project directory for the output.csv file');
            });
        }
    } else {
        // handling error
        console.log(err);
    }
});

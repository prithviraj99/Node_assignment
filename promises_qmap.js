var Q = require('q');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cheerio = require('cheerio');
var fs = require('fs');
Q.map = require('q-map').map;
// array of URLs
var URLs = ['https://www.rentomojo.com/bangalore?_escaped_fragment_=','https://www.rentomojo.com/mumbai?_escaped_fragment_=','https://www.rentomojo.com/pune?_escaped_fragment_=','https://www.rentomojo.com/delhi?_escaped_fragment_=','https://www.rentomojo.com/noida?_escaped_fragment_=','https://www.rentomojo.com/gurgaon?_escaped_fragment_='];
Q.map(URLs, function(url) {
    return Q.Promise(function(resolve,reject){
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, true);
              xhr.send();
              var str = "Text,URL\n";
              xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  var $ = cheerio.load(xhr.responseText),
                      links = $('a');
                  links.each(function (i, link) {
                    //extracting text and href attribute of <a> tags
                    var uri = $(link).attr("href");
                    var text = $(link).text();
                    if(!(uri == undefined)){
                      // check for href="undefined" and remove them
                      str += text+","+uri+"\n";
                    }
                  });
                  resolve(str);
                }
              };
    });
}, 5) // Limits promise concurrency to 5
.then(function(results) {
                for (var i = 0; i < results.length; i++) {
                // process results[i] here
                // writing them to output.csv file
                fs.writeFile('output2.csv', results[i], function(err){
                  if(err){
                    console.log(err);
                  }
                  console.log('File successfully written! - Check your project directory for the output2.csv file');
                });
            }
        }, function(err) {
            if(err){
              console.log(err);
            }
            // process error here
    });

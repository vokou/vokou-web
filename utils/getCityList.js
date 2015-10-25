var request = require('request');
var cheerio = require('cheerio');

var checker = {};
var cityArray = [];
var num = 0;
request('https://www.starwoodhotels.com/preferredguest/directory/hotels/all/list.html?display=hotels&language=en_US&pageType=list&regionName=all', function(err, resp, html) {
  var $ = cheerio.load(html);
  $('.propertyList.country').each(function(i, element) {
    var country = $(this).find('h4').text();
    if (country === 'United States' || country === 'Canada') {
      $(this).find('.state').each(function(i, element) {
        var state = $(this).find('h5').text();
        $(this).find('.ctylbl').each(function(i, element) {
          var city = $(this).text();
          var cityString = city + ', ' + state + ', ' + country;
          if (!checker[cityString]) {
            checker[cityString] = true;
            num++;
            cityArray.push(cityString);
          }
        });
      });
    } else {
      $(this).find('.ctylbl').each(function(i, element) {
        var city = $(this).text();
        var cityString = city + ', ' + country;
        if (!checker[cityString]) {
          checker[cityString] = true;
          num++;
          cityArray.push(cityString);
        }
      });
    }
  });
  //console.log(JSON.stringify(cityArray));
  process.exit();
});

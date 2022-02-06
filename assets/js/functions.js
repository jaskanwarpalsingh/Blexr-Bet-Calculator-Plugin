// contants defined
const api_key = 'd49ca84c70274868e3f72bd35d8f1cc8';
const api_base_url = 'https://api.the-odds-api.com/v3/';
const sports_api = api_base_url+'sports?api_key='+api_key;
const odds_api = api_base_url+'odds?apiKey='+api_key;

// default values to get the table data
var globalSport = 'americanfootball_nfl';
var globalRegion = 'us';
var globalMarket = 'h2h';

// 
var fractionsObject = [{
    "dec": 1.10,
    "fraction": "1/10"
}, {
    "dec": 1.11,
    "fraction": "1/9"
}, {
    "dec": 1.12,
    "fraction": "1/8"
}, {
    "dec": 1.14,
    "fraction": "1/7"
}, {
    "dec": 1.17,
    "fraction": "1/6"
}, {
    "dec": 1.2,
    "fraction": "1/5"
}, {
    "dec": 1.2222222222222223,
    "fraction": "2/9"
}, {
    "dec": 1.25,
    "fraction": "1/4"
}, {
    "dec": 1.2857142857142856,
    "fraction": "2/7"
}, {
    "dec": 1.3,
    "fraction": "3/10"
}, {
    "dec": 1.3333333333333333,
    "fraction": "1/3"
}, {
    "dec": 1.3636363636363638,
    "fraction": "4/11"
}, {
    "dec": 1.4,
    "fraction": "2/5"
}, {
    "dec": 1.4444444444444444,
    "fraction": "4/9"
}, {
    "dec": 1.5,
    "fraction": "1/2"
}, {
    "dec": 1.5333333333333332,
    "fraction": "8/15"
}, {
    "dec": 1.5714285714285714,
    "fraction": "4/7"
}, {
    "dec": 1.6153846153846154,
    "fraction": "8/13"
}, {
    "dec": 1.6666666666666665,
    "fraction": "4/6"
}, {
    "dec": 1.7272727272727273,
    "fraction": "8/11"
}, {
    "dec": 1.8,
    "fraction": "4/5"
}, {
    "dec": 1.8333333333333335,
    "fraction": "5/6"
}, {
    "dec": 1.9090909090909092,
    "fraction": "10/11"
}, {
    "dec": 2.0,
    "fraction": "Evs"
}, {
    "dec": 2.1,
    "fraction": "11/10"
}, {
    "dec": 2.2,
    "fraction": "6/5"
}, {
    "dec": 2.25,
    "fraction": "5/4"
}, {
    "dec": 2.375,
    "fraction": "11/8"
}, {
    "dec": 2.4,
    "fraction": "7/5"
}, {
    "dec": 2.5,
    "fraction": "6/4"
}, {
    "dec": 2.6,
    "fraction": "8/5"
}, {
    "dec": 2.625,
    "fraction": "13/8"
}, {
    "dec": 2.75,
    "fraction": "7/4"
}, {
    "dec": 2.8,
    "fraction": "9/5"
}, {
    "dec": 2.875,
    "fraction": "15/8"
}, {
    "dec": 3,
    "fraction": "2/1"
}, {
    "dec": 3.2,
    "fraction": "11/5"
}, {
    "dec": 3.25,
    "fraction": "9/4"
}, {
    "dec": 3.4,
    "fraction": "12/5"
}, {
    "dec": 3.5,
    "fraction": "5/2"
}, {
    "dec": 3.6,
    "fraction": "13/5"
}, {
    "dec": 3.75,
    "fraction": "11/4"
}, {
    "dec": 4,
    "fraction": "3/1"
}, {
    "dec": 4.333333333333334,
    "fraction": "10/3"
}, {
    "dec": 4.5,
    "fraction": "7/2"
}, {
    "dec": 5,
    "fraction": "4/1"
}, {
    "dec": 5.5,
    "fraction": "9/2"
}, {
    "dec": 6,
    "fraction": "5/1"
}, {
    "dec": 6.5,
    "fraction": "11/2"
}, {
    "dec": 7,
    "fraction": "6/1"
}, {
    "dec": 7.5,
    "fraction": "13/2"
}, {
    "dec": 8,
    "fraction": "7/1"
}, {
    "dec": 8.5,
    "fraction": "15/2"
}, {
    "dec": 9,
    "fraction": "8/1"
}, {
    "dec": 9.5,
    "fraction": "17/2"
}, ];

// add new values in the above object used for the fractions
for (var i = 10; i <= 101; i = i + .5) {
    if (i % 1 != 0) {
        fractionsObject.push({
            'dec': i,
            'fraction': parseFloat(i * 2) - 2 + '/2'
        });
    } else {
        fractionsObject.push({
            'dec': i,
            'fraction': parseFloat(i - 1) + '/1'
        });
    }
}

// method used to update the values in specific formats
function updateFormattedValues() {
    $('.odds').each(function(){
        var odd = $(this).val();
        if(odd) {
            var parsed = parseOddMax(odd);
            var finalVal = '';
            var oddType = $('#odds_format').val();
            switch(oddType) {
                case 'american':
                    finalVal = parsed.american;
                    break;
                case 'decimal':
                    finalVal = parsed.decimal;
                    break;
                case 'fractional':
                    finalVal = parsed.fractional;
                    break;
            }
            $(this).val(finalVal);
        }
    });
}

// method used to calculate the payout based on the bets
function calculate() {
    var payout = 0;
    var dec_total = 1;
    var stake = $('#stake').val();
    stake = parseInt(stake);
    $('#stake').val(stake);
    $('.odds').each(function () {
        var oddVal = $(this).val();
        if(oddVal) {
            var parsed = parseOdd(oddVal);
            console.log('parsed',parsed);
            if (parsed && parsed.decimal) {
                dec_total = dec_total * Number(parsed.decimal);
            }
            payout = Number(stake) * dec_total;
            payout = (payout).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    });
    $('#amount').html(payout);
}

// method used to parse the values and format them based on the odds type
function parseOdd(v) {
    v = String(v);
    if (v == "" || String(v).match(/[a-z]/i)) return;
    var odds = {
        type_used: '',
        american: '',
        decimal: '',
        fractional: ''
    }
    if (v.indexOf("/") > 0) {
        var s = v.split('/'),
            num = s[0],
            den = s[1];
        if (!num || !den) return;
        odds.type_used = 'fractional';
        odds.fractional = v;
        odds.decimal = convertToDecimal(odds.fractional);
        odds.american = convertDecimalToAmerican(odds.decimal);
    } else if (v.indexOf(".") > 0 || (v.indexOf("/") === -1 && v > 0 && v <= 100)) {
        odds.type_used = 'decimal';
        odds.decimal = v;
        odds.fractional = convertDecimalToFraction(odds.decimal);
        odds.american = convertDecimalToAmerican(odds.decimal);
    } else {
        odds.type_used = 'american';
        odds.american = v;
        odds.decimal = convertAmericanToDecimal(odds.american);
        odds.fractional = convertDecimalToFraction(odds.decimal);
    }
    if (odds.decimal != '') odds.decimal = Number(odds.decimal).toFixed(3);
    if (odds.decimal == 'NaN') odds.decimal = '';
    if (Number(odds.american) > 0 && String(odds.american).indexOf('+') == -1) {
        odds.american = '+' + odds.american;
    }
    return odds;
}

// method used to restrict the max values for the strict and odds
function parseOddMax(v) {
    var odds = parseOdd(v);
    if (odds.decimal && Number(odds.decimal) > 100) {
        var max = '100.000';
        if (odds.type_used == 'fractional') max = '99/1';
        if (odds.type_used == 'american') max = '+9900';
        return parseOdd(max);
    }
    return odds;
}

// method used convert the odd from decimal to american format
function convertDecimalToAmerican(decimal) {
    if (decimal > 2) {
        return Math.round(100 * (decimal - 1));
    } else {
        return Math.round(-100 / (decimal - 1));
    }
}

// method used convert the odd from american to decimal format
function convertAmericanToDecimal(american) {
    if (american < 0) {
        return 1 + -100 / american;
    } else {
        return 1 + american / 100;
    }
}

// method used convert the odd to american format
function fractionToAmerican(fraction) {
    var dec = convertToDecimal(fraction);
    return convertDecimalToAmerican(dec);
}

// method used convert the odd to decimal format
function convertToDecimal(fraction) {
    var numDen = fraction.toString().replace(/\s*/g, '').split('/');
    if (numDen.length !== 2) return;
    var numerator = parseInt(numDen[0]),
        denominator = parseInt(numDen[1]);
    return 1 + (numerator / denominator);
}

// method used convert the odd from decimal to fraction
function convertDecimalToFraction(decimal) {
    var ret;
    fractionsObject.forEach(function(paired) {
        if (parseFloat(decimal) == parseFloat(paired.dec)) {
            ret = paired.fraction;
        }
    });
    return (!ret) ? getNearestPair(decimal).fraction : ret;
}

// method used to fetch the nearest pair
function getNearestPair(goal) {
    goal = parseFloat(goal);
    var closest = null,
        closestPair = null;
    fractionsObject.forEach(function(paired, i) {
        if (!paired.dec) return;
        var dec = parseFloat(paired.dec);
        if (closest == null || Math.abs(dec - goal) < Math.abs(closest - goal)) {
            closest = dec;
            closestPair = {
                'decimal': dec,
                'fraction': paired.fraction,
                position: i
            }
        }
    });
    return closestPair || {
        'decimal': goal,
        'fraction': null,
        position: fractionsObject.length - 1
    }
}

// method used to execute the ajax request, and call the function accordingly
function ajaxRequest(req_url,data) {
    $.ajax({
        url: req_url,
        type: 'GET',
        data: data,
        success: function(res){
            if(data.type=='odds') {
                generateOddsDataTable(res.data);
            } else {
                generateOddsDataTableFilters(res.data,data);
            }
        }
    })
}

// method used to fetch the sports data from api to create filter dropdown
function fetchSportsData(dataType) {
    var data = {
        sport:globalSport,
        region:globalRegion,
        mkt:globalMarket,
        type:dataType
    }
    ajaxRequest(sports_api,data);
}

// method used to fetch the odd data from the api based on the input parameters
function fetchOddsData(sportVal,regionVal,mktVal) {
    var data = {
        sport:(sportVal!=undefined) ? sportVal : globalSport,
        region: (regionVal!=undefined) ? regionVal : globalRegion,
        mkt: (mktVal!=undefined) ? mktVal : globalMarket,
        type:'odds'
    }
    globalSport=data.sport;
    globalRegion=data.region;
    globalMarket=data.mkt;
    ajaxRequest(odds_api,data);
}

//method used to conver the epoch to date format
function EpochToDate(epoch) {
    if (epoch < 10000000000)
        epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
    var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
    return new Date(epoch);
}

// method used to create the filters html for the data table
function generateOddsDataTableFilters(data,ddValues) {
    var elementHtml = '';
    for(x in data) {
        var selected='';
        var row = data[x];
        if(row.key==ddValues.sport) {
            selected = 'selected';
        }
        elementHtml += '<option value="'+row.key+'" '+selected+'>'+row.title+' ('+row.details+')</option>';
    }
    $('#sport').html(elementHtml);
    $('#region option[value="'+ddValues.region+'"]').attr('selected','selected');
    $('#market option[value="'+ddValues.mkt+'"]').attr('selected','selected');
}

// method used the create the data table
function generateOddsDataTable(data) {
    var tableHtml = '<div class="filter-container"><label for="sport">Sport</label><select name="sport" id="sport" class="sport"></select><label for="region">Region</label><select name="region" id="region" class="region"><option value="">Select</option><option value="au">Australia</option><option value="uk">United Kingdom</option><option value="eu">Europe</option><option value="us">United States</option></select><label for="market">Market</label><select name="market" id="market" class="market"><option value="">Select</option><option value="h2h">Head to Head</option><option value="spreads">Handicaps</option><option value="totals">Over/Under</option></select><button id="filter">Filter</button></div>';
    for(x in data) {
        var homeIconT1 = (data[x].teams[0]==data[x].home_team) ? '<i class="fa fa-home"></i>':'';
        var homeIconT2 = (data[x].teams[1]==data[x].home_team) ? '<i class="fa fa-home"></i>':'';
        tableHtml += '<div class="sports-container"><div class="left-container"><h6 class="team-name">'+data[x].teams[0]+'<span>'+homeIconT1+'</span></h6><p class="versus">VS</p><h6 class="team-name">'+data[x].teams[1]+'<span>'+homeIconT2+'</span></h6><div class="date">'+EpochToDate(data[x].commence_time)+'</div></div><div class="right-container"><div class="scrollable-container">';
        for(y in data[x].sites) {
            var site = data[x].sites;
            tableHtml += '<div class="bet-detais"><h6>'+site[y].site_nice+'</h6><div class="bets">';
            if(site[y].odds.h2h) {
                var inc=1;
                for(z in site[y].odds.h2h) {
                    var singleOdd = site[y].odds.h2h;
                        tableHtml += '<div class="single-bet"><span class="counter">'+inc+'</span><span class="value">'+singleOdd[z]+'</span></div>';
                        inc++;
                }
            }
            if(site[y].odds.spreads) {
                var inc=1;
                for(z in site[y].odds.spreads) {
                    var singleOdd = site[y].odds.spreads;
                        tableHtml += '<div class="single-bet"><span class="counter">'+inc+'</span><span class="value">'+singleOdd[z]+'</span></div>';
                        inc++;
                }
            }
            if(site[y].odds.totals) {
                var inc=1;
                for(z in site[y].odds.totals) {
                    var singleOdd = site[y].odds.totals;
                        tableHtml += '<div class="single-bet"><span class="counter">'+inc+'</span><span class="value">'+singleOdd[z]+'</span></div>';
                        inc++;
                }
            }
            tableHtml += '</div></div>';
        }
        tableHtml += '</div></div></div>';
    }
    $('.wp-block-blexr-sports-odd-data-table').html(tableHtml);
    fetchSportsData('sports');
}

// auto execute the function, and if the element found on the page, the table values get bind automatically
fetchOddsData();
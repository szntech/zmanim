let adjHour = [18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
function rawMoladConveter(rawMolad)//Takes in a molad as Chelakim and returns an array with the [day,hour,minutes,chelakim]
{//console.log('here is in the beginning of the function '+c);
let y= rawMolad*1;
            let c2 = rawMolad % 18
          //  console.log('here is in the function '+c2);
            let rawm2 = rawMolad - c2
            let rawm22 = rawm2 % 1080
            let m2 = rawm22 / 18
            let rawh2 = rawm2 - m2 * 18
            let rawh22 = rawh2 % 25920
            let h2 = rawh22 / 1080
            let rawd2 = rawh2 - rawh22
            let rawd22 = rawd2 / 25920
            let d2 = rawd22 % 7
    let molad2 = [d2,h2,m2,c2];
    return molad2;
}

function moladCalc(d,h,m,c,mLater)//Takes in a molad and how meany months later you want the molad for (day,hour,minute,chelakim,months later) 
//and returns an array with the requsted [day,hour,minutes,chelakim]
  {
    let bd=d*24*1080; let bh=h*1080; let bm = m*18; let y= c*1;//b means big - made into chelakim
    let bmolad1= bd + bh +bm +y;
		//	console.log('big molad with c'+bmolad1);
    let totalOdef = mLater * 39673;
    let rawMolad2 = totalOdef + bmolad1;		
    let molad2 = rawMoladConveter(rawMolad2);
    return molad2;
}

function boolLeapyear(hebrewyear)
{
  const leapcycle = [false,false,true,false,false,true,false,true,false,false,true,false,false,true,false,false,true,false,true];
  var machzorhelper = hebrewyear-1;
	var yearinmachzor = machzorhelper % 19;
  var isLeapYear = leapcycle[yearinmachzor]

  return isLeapYear;
}

function monthsInYear(year){
  let isleap = boolLeapyear(year)
if (isleap) {
  return 13;
} else {
  return 12;
}}




function machzorkatan(hyear){//takes in a hebrew year and returns an array with molad of R"h  [day,hour,minutes,chelakim]
    var machzorhelper = hyear-1;
    var machzornum = Math.floor(machzorhelper/19);
	  var yearinmachzor = machzorhelper % 19;
    var odefcycle = 69715;
    var bharad = 57444;
    var currentCodef = machzornum * odefcycle;
    var cycle = [0,0,0,1,1,1,2,2,3,3,3,4,4,4,5,5,5,6,6];
    var plusCYear = yearinmachzor * 12 + cycle[yearinmachzor];
    var odef = plusCYear * 39673 + bharad + currentCodef;
	  var moladRH = rawMoladConveter(odef);
    return moladRH;     
}

function yearinfo(hyear)//Takes in a hebrew year and returns an arry with [number machzor katan it is in, year number of the machzor katan, number machzor gadol it is in,
// year number of the machzor gadol, bool value if it is a leap year]
{
  var machzorhelper = hyear-1;
  var machzorknum = Math.floor(machzorhelper/19);
  machzorknum = machzorknum +1;
  var yearinmachzork = machzorhelper % 19;
  yearinmachzork = yearinmachzork + 1
  var machzorgnum = Math.floor(machzorhelper/28);
  machzorgnum = machzorgnum+1
  var yearinmachzorg = machzorhelper % 28;
  yearinmachzorg = yearinmachzorg+1;
  var boolleap = boolLeapyear(hyear);
  var info = [machzorknum,yearinmachzork,machzorgnum,yearinmachzorg,boolleap]
  return info; 
}


function docmoladcalc() {document.querySelector('#clac-molad').onclick = function(){
	let di = document.querySelector('#dayow').value
	let hi = document.querySelector('#hour').value
	let mi = document.querySelector('#minutes').value
	let chel = document.querySelector('#chelakim').value
	let mli = document.querySelector('#monlater').value

	let a = moladCalc(di,hi,mi,chel,mli)
	document.body.style.backgroundColor = 'green'
	document.getElementById('moladChart').style.backgroundColor = 'yellow'
	let newrow = document.createElement('tr');
	newrow.id = 'newMolad';
	newrow.innerHTML= '<td></td><td>'+mli+'</td><td>'+ a[0]+ '</td><td>' + a[1] + '</td><td>'+ a[2] + '</td><td>' + a[3]+'</td>';
  document.getElementById('moladChartbody').appendChild(newrow);

}}
  
docmoladcalc();

document.querySelector('#clac-RH').onclick = function(){
  document.getElementById('moladChart2').innerHTML="<tr><td></td><td>Month</td><td>Day</td><td>Hour</td><td>Minutes</td><td>Chelakim</td>"
	let IHebrewYear = document.querySelector('#inputhebrewY').value;
	if (IHebrewYear>19) {
    let MRH = machzorkatan(IHebrewYear);
    let mos = monthsInYear(IHebrewYear);
    let numMon = 0;
    while(numMon<mos){
      cmolad = moladCalc(MRH[0],MRH[1],MRH[2],MRH[3],numMon)
      numMon = numMon+1
		  let newrow = document.createElement('tr');
		  newrow.id = 'newMolad';
		  newrow.innerHTML= '<td></td><td>'+numMon+'</td><td>'+ cmolad[0]+ '</td><td>' + adjHour[cmolad[1]] + '</td><td>'+ cmolad[2] + '</td><td>' + cmolad[3]+'</td>';
      document.getElementById('moladChart2').appendChild(newrow);
    }
    let yearinfoElement = document.createElement('p');
    yearinfoElement.id = 'yinfo';
    let a= yearinfo(IHebrewYear);
    yearinfoElement.innerHTML = IHebrewYear+' is in the machzor number '+a[0]+', and year number '+a[1]+' in the machzor katan <br> and it is in the machzor gadol number '+a[2]+', and year number '+a[3]+' in the machzor gadol'
    document.getElementById('calCalc').appendChild(yearinfoElement);
		
	} else {
		alert('You have enterd an unsupported early Year. Please enter a year after the Year 19.')	
	}	
  }
  
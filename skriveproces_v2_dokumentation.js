// 7/8-2017 Møde med Ester ang skriveguide - beslutninger:
// =======================================================
// - Den lange tekst i step 10 skal være den første tekst i WORD-dokumentet
// - Ester ønsker samme advarsel som Erwin om browser
// - Ester Ønsker microhint på progressbar der fortæller kursisten om progression ligesom Erwin
// - Alle referancer med glyphicon skal være microhints  



//################################################################################################################
// 
// 				TEST FUNKTIONER TIL SKRIVEGUIDE MED ESTER MONRAD	-	28/6-2017
//
//################################################################################################################


markKeyWords = {
	thisClass: 'mkw_this',
	dollarClass: 'mkw_dollar',
	parenthesisClass: 'mkw_parenthesis',
	selectorClass: 'mkw_selector',
	delimiter: '(_#_)',
	
	thisMarker: function (str) {
		str.replace(/this./g, '<span class="'+thisClass+'">this</span>.');
	},
	stringMarker: function (str) {
		var mArr = HTML.match(/('#\w+'|"#\w+"|'.\w+'|".\w+")/g);
	},
	jqSelector: function (str) {
		console.log('\njqSelector - CALLED');

		console.log('\njqSelector - str 1:' + str);
		
		var posStart = str.indexOf('$(');
		while (posStart!==-1) {
			var posEnd = str.indexOf(')', posStart);
			if (posEnd!==-1) {
				var Tstr = str.substring(posStart, posEnd+1);
				var TTstr = Tstr;
				var selector = str.substring(posStart+2, posEnd);
				Tstr = Tstr.replace(/\$/g, '<span class="'+this.dollarClass+'">$</span>');
				Tstr = Tstr.replace(/\(/g, '<span class="'+this.parenthesisClass+'">(</span>');
				Tstr = Tstr.replace(/\)/g, '<span class="'+this.parenthesisClass+'">)</span>');
				Tstr = Tstr.replace(selector, '<span class="'+this.selectorClass+'">'+selector+'</span>');

				str = str.replace(TTstr, Tstr);
			}
			posStart = str.indexOf('$(', posEnd+1);
		}
		console.log('jqSelector - str 2:' + str);
	},
	helper_positionOfParenthesis: function(str, parenthisisObj, startParenthisisPosition) {
		console.log('\nhelper_positionOfParenthesis - CALLED');

		console.log('helper_positionOfParenthesis - str:' + str + ', parenthisisObj: ' + JSON.stringify(parenthisisObj) + ', startParenthisisPosition: ' + startParenthisisPosition);

		var posStart = str.indexOf(parenthisisObj.start, startParenthisisPosition);
		var TposStart = posStart;
		var TposEnd = posStart;

		var count = 0;
		// var posEnd = str.indexOf(parenthisisObj.end, posStart);
		// var TposEnd = posEnd;

		while ((TposStart!==-1)) {
			console.log('helper_positionOfParenthesis - count:' + count);

			console.log('helper_positionOfParenthesis - TposStart 1:' + TposStart + ', TposEnd 1: ' + TposEnd);

			TposStart = str.indexOf(parenthisisObj.start, TposStart+1);
			TposEnd = str.indexOf(parenthisisObj.end, TposEnd+1);
			console.log('helper_positionOfParenthesis - TposStart 2:' + TposStart + ', TposEnd 2: ' + TposEnd);
			
			if ((TposStart===-1) || ((TposEnd!==-1) && (TposEnd < TposStart))) {
				console.log('helper_positionOfParenthesis - A0');
				break;
			}

			TposStart = str.indexOf(parenthisisObj.start, TposStart+1);

			++count;
		}
		console.log('helper_positionOfParenthesis - END - posStart:' + posStart + ', TposEnd: ' + TposEnd);

		return {"start": posStart, "end": TposEnd};
	},
	helper_returnInnerArg: function(str, parenthisisObj, startParenthisisPosition){
		console.log('\nhelper_returnInnerArg - CALLED');

		console.log('helper_returnInnerArg - str:' + str + ', parenthisisObj: ' + JSON.stringify(parenthisisObj));

		var posStart = str.indexOf(parenthisisObj.start, startParenthisisPosition);
		var TposStart = posStart;
		var innerArg = null;

		if ((TposStart!==-1)) {

			var TposEnd = this.helper_positionOfParenthesis(str, parenthisisObj, posStart).end;
			console.log('helper_returnInnerArg - TposStart 1:' + TposStart + ', TposEnd 1: ' + TposEnd);
			
			if ((TposEnd!==-1) && (TposStart < TposEnd)) {
				console.log('helper_returnInnerArg - A0');
				innerArg = str.substring(posStart+1, TposEnd);
			}
		}
		console.log('helper_returnInnerArg - innerArg:' + innerArg);

		return innerArg;
	},
	helper_outerParenthesis: function(obj1, obj2) {
		console.log('\nhelper_outerParenthesis - CALLED');

		if ((obj1.start < obj2.start) && (obj2.end < obj1.end)) {
			return obj1;
		}

		if ((obj2.start < obj1.start) && (obj1.end < obj2.end)) {
			return obj2;
		}

		return false;
	},
	TEST_helper_outerParenthesis: function(str) {
		console.log('\nTEST_helper_outerParenthesis - CALLED');

		var pPos1 = this.helper_positionOfParenthesis(str, {start: '(', end: ')'}, 0);
		var pPos2 = this.helper_positionOfParenthesis(str, {start: '[', end: ']'}, 0);
		var pPos3 = this.helper_positionOfParenthesis(str, {start: '{', end: '}'}, 0);

		console.log('TEST_helper_outerParenthesis - helper_outerParenthesis(pPos1, pPos2): ' + JSON.stringify( this.helper_outerParenthesis(pPos1, pPos2) ));
		console.log('TEST_helper_outerParenthesis - helper_outerParenthesis(pPos2, pPos1): ' + JSON.stringify( this.helper_outerParenthesis(pPos2, pPos1) ));
		console.log('TEST_helper_outerParenthesis - BOOL - helper_outerParenthesis(pPos2, pPos1): ' + ((this.helper_outerParenthesis(pPos1, pPos2))? true : false));
	},
	findCodePiece: function(str){
		console.log('\nfindCodePiece - CALLED');

		console.log('findCodePiece - str 1:' + str );

		var mArr = str.match(/(\w+\(|\w+\[|\w+\{)/g);
		console.log('findCodePiece - mArr:' + mArr);

		var posStart = 0;
		var parenthisisObj;

		var posArr = [];

		for (var n in mArr) {
			console.log('findCodePiece - mArr['+n+']:' + JSON.stringify(mArr[n]) );

			var posEnd = null;

			if (mArr[n].indexOf('(')!==-1) {
				console.log('findCodePiece - A0');
				parenthisisObj = {start: '(', end: ')'};
			}
			
			if (mArr[n].indexOf('[')!==-1) {
				console.log('findCodePiece - A1');
				parenthisisObj = {start: '[', end: ']'};
			}

			if (mArr[n].indexOf('{')!==-1) {
				console.log('findCodePiece - A2');
				parenthisisObj = {start: '{', end: '}'};
			}

			// FIND START AND END POSITIONS:
			posStart = str.indexOf(mArr[n], posStart);
			posEnd = this.helper_positionOfParenthesis(str, parenthisisObj, posStart).end;
			console.log('findCodePiece - posStart:' + posStart + ', posEnd: ' + posEnd);

			posArr.push({start: posStart, end: posEnd});

			// REMOVE SPACES:
			if ((posStart!==-1) && (posEnd!==-1)) {
				console.log('findCodePiece - A3');

				var Tstr = str.substring(posStart, posEnd+1);
				var Tstr_escaped = Tstr.replace('(', '\\(').replace(')', '\\)');
				var Tstr_noSpace = Tstr.replace(/ /g, '');
				console.log('findCodePiece - Tstr:' + Tstr + ', Tstr_escaped: ' + Tstr_escaped + ', Tstr_noSpace: ' + Tstr_noSpace);
				var reg = new RegExp(Tstr_escaped, 'g');
				console.log('findCodePiece - reg:' + reg );
				str = str.replace(reg, Tstr_noSpace);
			}
		}

		console.log('findCodePiece - str 2:' + str );

		var codeArr = [];

		for (var n in posArr) {
			console.log('findCodePiece - posArr['+n+']:' + JSON.stringify(posArr[n]) );

			posStart = str.lastIndexOf(' ', posArr[n].start);
			console.log('findCodePiece - posStart:' + posStart );
			if (posStart===-1) {
				console.log('findCodePiece - A4a');
				posStart = 0;
			} else {
				console.log('findCodePiece - A4b');
				posStart = posStart + 1;
			}

			posEnd = str.indexOf(' ', posArr[n].end);
			console.log('findCodePiece - posEnd:' + posEnd );
			if (posEnd===-1) {
				console.log('findCodePiece - A5');
				posEnd = str.length-1;
			}

			if (str.substring(posEnd-1, posEnd)=='.') {
				console.log('findCodePiece - A6');
				posEnd = posEnd-1;
			}

			console.log('findCodePiece - posStart:' + posStart + ', posEnd: ' + posEnd);
			var code = str.substring(posStart, posEnd);
			codeArr.push(code);
		}
		console.log('findCodePiece - codeArr:' + JSON.stringify(codeArr) );
	}
}

var mkw = Object.create(markKeyWords);
mkw.jqSelector('Dette er en test $(".test") for at se om det virker!');

mkw.helper_positionOfParenthesis('XXX() XXX()', {start: '(', end: ')'}, 0);
mkw.helper_positionOfParenthesis('XXX((...)(...)) XXX()', {start: '(', end: ')'}, 0);
mkw.helper_positionOfParenthesis('XXX(XXX(...)) XXX()', {start: '(', end: ')'}, 0);
mkw.helper_positionOfParenthesis('Dette er en test $(".test") for at se om det virker!', {start: '(', end: ')'}, 0);
mkw.helper_positionOfParenthesis('Dette er en test $(".test" for at se om det virker!', {start: '(', end: ')'}, 0);
mkw.helper_positionOfParenthesis('Dette er en test $".test" for at se om det virker!', {start: '(', end: ')'}, 0);
mkw.helper_positionOfParenthesis('Dette er en test function1(function2(), xxx) for at se om det virker!', {start: '(', end: ')'}, 0);
mkw.helper_positionOfParenthesis('Dette er en test function1(function2(), xxx) for at se om det virker!', {start: '(', end: ')'}, 35);

mkw.helper_returnInnerArg('Dette er en test function1(function2(), xxx) for at se om det virker!', {start: '(', end: ')'}, 0);

mkw.TEST_helper_outerParenthesis('Dette er en test function1(rteyr[]rty)....');
mkw.TEST_helper_outerParenthesis('Dette er en test function1()....');

mkw.findCodePiece('function.test(x1, x2) asd ewer function.test(x1, x2) function[x2 ] function{ x3} yii iiy');


// 012345678901234567890123456789012345678901234567890123456789
//           |         |         |         |         |
// XXX((...)(...)) XXX()
// XXX(XXX(...)) XXX()
// function.test(x1, x2) asd ewer function.test(x1, x2) function[x2 ] function{ x3} yii iiy
// asd ewer function.test(x1, x2) function[x2] function{x3} yii iiy
// Dette er en test function1(rteyr[]rty)
// Dette er en test $(".test") for at se om det virker!
// Dette er en test function1(function2(), xxx) for at se om det virker!


function colorSelector(selector, colorScheme) {
	console.log('\nEXTERNAL FUNCTION colorSelector - CALLED');

	console.log('\nEXTERNAL FUNCTION colorSelector - selector: "'+selector+'", colorScheme: ' + colorScheme);

	$(selector).each(function( index, element ) {

		var HTML = $(element).html();
	
		// var HTML = selector;
		console.log('\nEXTERNAL FUNCTION colorSelector - HTML 1: ' + HTML + ', index: ' + index);

		// switch(colorScheme) {
		// 	case 'code':
		// 		var mArr = HTML.match(/('#\w+'|"#\w+"|'.\w+'|".\w+")/g);
		// 		console.log('\nEXTERNAL FUNCTION colorSelector - mArr: ' + mArr);

		// 		if (mArr!==null) {
		// 			for (var n in mArr) {
		// 				console.log('\nEXTERNAL FUNCTION colorSelector - mArr['+n+']: ' + mArr[n]);
		// 				HTML = HTML.replace(mArr[n], '<span class=@code_arg@>'+mArr[n]+'</span>');
		// 			}
		// 		}

		//         HTML = HTML.replace('this', '<span class=@code_this@>this</span>');

		//         console.log('\nEXTERNAL FUNCTION colorSelector - HTML 2: ' + HTML);

		//         HTML = HTML.replace(/@/g, '"');

		//         break;
		//     default:
		//         console.log('\n==================\n\tERROR: \n\thandler_errCondition - currentStepNo: ' + this.api.currentStepNo + ', function: "' + c.cmd + '" does not exist!\n==================\n');
		// }
		// console.log('\nEXTERNAL FUNCTION colorSelector - HTML: ' + HTML);

		// $(selector).html(HTML);

	});
}

// colorSelector("this.api.userData['.id']", 'code');


function external_template1(dataObj1, dataObj2) {
	console.log('\nexternal_template1 - EXTERNAL TEST-TEMPLATE CALLED!')
	console.log('external_template1 - dataObj1: ' + JSON.stringify(dataObj1));
	console.log('external_template1 - dataObj2: ' + JSON.stringify(dataObj2));
}


$( document ).on('click', "#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p, #summeryContainer i", function(event){
	console.log('editText - api: ' + JSON.stringify(wpc.api));
	
	window.sthis = this;
	window.sid = $(this).attr('data-id').replace('#', '');

	var HTML = '<textarea id="'+sid+'" class="autoSaveOff"></textarea>';
	HTML += '<span class="save summerySave btn btn-info">GEM</span>';
	wpc.template_userMsgBox({id: "summeryTemplate"}, HTML);
});


$( document ).on('click', ".summerySave", function(event){
	var value = $('#'+sid).val();
	$(sthis).text(value);
	wpc.api.userData['#'+sid] = value;
	wpc.close_template_userMsgBox(null);
	osc.save('apiData', wpc.api);
});


function contentOf(parentTag, userDataId) {
	// return '<'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';

	// return '<div class="contentWrap"> <span class="glyphicon glyphicon-pencil"></span> <'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
	return '<div class="contentWrap"> <'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
}


function contentOf2(parentTag, userDataId) {
	
	return '<'+parentTag+'>'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';
}


// FRA ERWIN'S SKRIVEGUIDE
function summery(selector) {
	console.log('\nEXTERNAL FUNCTION summery - CALLED');

	var HTML = '';

	HTML += '<div id="summeryContainer">';

	// HTML += 	'<div class="contentWrap">'+contentOf('h1','#textArea_10_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  	// Step 10: Overskrift
	// HTML += 	'<div class="contentWrap">'+contentOf('span','#inputField_1_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  	// Step 1: Titel
	// HTML += 	'<div class="contentWrap">'+contentOf('span','#inputField_1_2')+'<span class="glyphicon glyphicon-pencil"></span></div>';  	// Step 1: Forfatter
	// HTML += 	'<div class="contentWrap">'+contentOf('span','#inputField_1_3')+'<span class="glyphicon glyphicon-pencil"></span></div>';  	// Step 1: Årstal
	// HTML += 	'<div class="contentWrap">'+contentOf('h3','#textArea_10_2')+'<span class="glyphicon glyphicon-pencil"></span></div>';  	// Step 10: Indledning
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_2_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 2: Formulér ca. 10 linjer hvori du viser, at "Den grimme ælling" er et eventyr. 
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_3_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 3: Citat
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_4_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 4: Forklar hvorfor dit citat viser, at teksten tilhører genren eventyr.
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_5_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 5: Beskriv kort miljøet, som det fremstilles i eventyrets første 15 linjer.
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_6_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 6: Find et citat fra et andet sted i teksten, som du synes står i kontrast til begyndelsen, hvad angår miljøet.
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_7_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 7: Forklar dit citat, idet du fremhæver enkelte ord fra det valgte tekststykke, som tydeliggør kontrasten.
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_8_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 8: Forklar nu med dine egne ord, hvad H.C. Andersen mener med eventyrets morale, og hvordan hele eventyret er med til at gøre denne pointe tydelig.
	// HTML += 	'<div class="contentWrap">'+contentOf('p','#textArea_9_1')+'<span class="glyphicon glyphicon-pencil"></span></div>';  		// Step 9: Afslutning

	HTML += 	contentOf('h1','#textArea_10_1');  		// Step 10: Overskrift
	HTML += 	'<div id="author">';
	HTML += 		contentOf('span','#inputField_1_1');  	// Step 1: Titel
	HTML += 		contentOf('span','#inputField_1_2');  	// Step 1: Forfatter
	HTML += 		contentOf('span','#inputField_1_3');  	// Step 1: Årstal
	HTML += 	'</div>';
	HTML += 	'<h4>Indledning:</h4>';
	HTML += 	contentOf('p','#textArea_10_2');  		// Step 10: Indledning
	HTML += 	'<h4>Genre begrundelse:</h4>';
	HTML += 	contentOf('p','#textArea_2_1');  		// Step 2: Formulér ca. 10 linjer hvori du viser, at "Den grimme ælling" er et eventyr. 
	HTML += 	'<h4>Citat der begrunder genre:</h4>';
	// HTML += 	contentOf('i','#textArea_3_1');  		// Step 3: Citat
	HTML += 	contentOf('p','#textArea_3_1');  
	HTML += 	'<h4>Begrundelse for valg af citat:</h4>';
	HTML += 	contentOf('p','#textArea_4_1');  		// Step 4: Forklar hvorfor dit citat viser, at teksten tilhører genren eventyr.
	HTML += 	'<h4>Miljøbeskrivelse:</h4>';
	HTML += 	contentOf('p','#textArea_5_1');  		// Step 5: Beskriv kort miljøet, som det fremstilles i eventyrets første 15 linjer.
	HTML += 	'<h4>Citat om kontrast i miljøet:</h4>';
	// HTML += 	contentOf('i','#textArea_6_1');  		// Step 6: Find et citat fra et andet sted i teksten, som du synes står i kontrast til begyndelsen, hvad angår miljøet.
	HTML += 	contentOf('p','#textArea_6_1');
	HTML += 	'<h4>Citatforklaring:</h4>';
	HTML += 	contentOf('p','#textArea_7_1');  		// Step 7: Forklar dit citat, idet du fremhæver enkelte ord fra det valgte tekststykke, som tydeliggør kontrasten.
	HTML += 	'<h4>Morale:</h4>';
	HTML += 	contentOf('p','#textArea_8_1');  		// Step 8: Forklar nu med dine egne ord, hvad H.C. Andersen mener med eventyrets morale, og hvordan hele eventyret er med til at gøre denne pointe tydelig.
	HTML += 	'<h4>Afslutning:</h4>';
	HTML += 	contentOf('p','#textArea_9_1');  		// Step 9: Afslutning


	HTML += '</div>';
	
	$(selector).html(HTML);

	// $('#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p').wrap("<span class='glyphicon glyphicon-pencil'></span>");
}


function download() {
	console.log('\nEXTERNAL FUNCTION download - CALLED');

	var HTML = wordTemplate();
	// var HTML = "TEST DOWNLOAD"; 
	
	var converted = htmlDocx.asBlob(HTML);
    console.log("EXTERNAL FUNCTION download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'Min analyse - den grimme ælling.docx');
}


function wordTemplate() {
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial;}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	// HTML += 			'h3 {font-style: italic; color: #717272;}';
	// HTML += 			'h4 {color: #56bfc5;}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
	HTML += 			'p {font-size: 14px; margin-bottom: 5px}';
	HTML += 			'table {padding: 8px; width: 100%;}';
	HTML += 			'td {width: 25%;}';
	HTML += 			'ul {font-size: 14px;}';
	HTML += 			'#author div {display: inline-block;}';
	HTML += 			'.instruction {color: #999;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';

	HTML += 	'<div class="instruction">';
	HTML += 		'<h3>Instruktioner</h3>';
	HTML += 		'<p>';
	HTML += 	   	 	'Inden du går i gang med redigeringarbejdet skal du kopiere og gemme dette dokument som det er, så du til sidst kan aflevere både dette dokument som det ser ud inden gennemskrivningen samt den færdige tekst. Det skal du gøre, så din lærer kan give dig feedback både på analysearbejdet, og på den færdige tekst.';
	HTML += 		'</p>';
	HTML += 		'<p>';
	HTML += 	    	'Du har nu lavet en stor del af arbejdet til din analyse af ”Den grimme ælling”, og det er samlet her i et worddokument. Du skal nu arbejde med teksten, så den ender med at blive en god og gennemskrevet tekst. Derfor skal du nu arbejde med følgende ting:';
	HTML += 		'</p>';
	HTML += 		'<ul>';
	HTML += 	    	'<li>';
	HTML += 	        	'Du skal læse dine afsnit igennem, og gøre teksten så klar, præcis og sammenhængende som muligt, således at dine gode pointer står tydeligt frem.';
	HTML += 	    	'</li>';
	HTML += 	    	'<li>';
	HTML += 	        	'Du skal skabe nogle gode og logiske overgange imellem de forskellige afsnit. Forsøg i den forbindelse, om du kan skabe en logisk rød tråd fra begyndelsen af opgaven til slutningen.';
	HTML += 	    	'</li>';
	HTML += 	    	'<li>';
	HTML += 	        	'Du skal kigge på din indledning og afrunding, og overveje, om de fungerer godt eller om de skal forbedres.';
	HTML += 	    	'</li>';
	HTML += 	    	'<li>';
	HTML += 	        	'Kig på dit sprog, er det godt og levende og med så få formuleringsmæssige uklarheder og stavefejl som muligt?';
	HTML += 	    	'</li>';
	HTML += 		'</ul>';
	HTML += 	'</div>';
	HTML += 	'<hr>';
	HTML += 	'<br>';
	
	HTML += 	contentOf2('h1','#textArea_10_1');  		// Step 10: Overskrift
	// HTML += 	'<div id="author">';
	HTML += 		contentOf2('span','#inputField_1_1')+', ';  	// Step 1: Titel
	HTML += 		contentOf2('span','#inputField_1_2')+', ';  	// Step 1: Forfatter
	HTML += 		contentOf2('span','#inputField_1_3');  			// Step 1: Årstal
	// HTML += 	'</div>';
	HTML += 	'<h4>Indledning:</h4>';
	HTML += 	contentOf2('p','#textArea_10_2');  		// Step 10: Indledning
	HTML += 	'<h4>Genre begrundelse:</h4>';
	HTML += 	contentOf2('p','#textArea_2_1');  		// Step 2: Formulér ca. 10 linjer hvori du viser, at "Den grimme ælling" er et eventyr. 
	HTML += 	'<h4>Citat der begrunder genre:</h4>';
	HTML += 	contentOf2('p','#textArea_3_1');  		// Step 3: Citat
	HTML += 	'<h4>Begrundelse for valg af citat:</h4>';
	HTML += 	contentOf2('p','#textArea_4_1');  		// Step 4: Forklar hvorfor dit citat viser, at teksten tilhører genren eventyr.
	HTML += 	'<h4>Miljøbeskrivelse:</h4>';
	HTML += 	contentOf2('p','#textArea_5_1');  		// Step 5: Beskriv kort miljøet, som det fremstilles i eventyrets første 15 linjer.
	HTML += 	'<h4>Citat om kontrast i miljøet:</h4>';
	HTML += 	contentOf2('p','#textArea_6_1');  		// Step 6: Find et citat fra et andet sted i teksten, som du synes står i kontrast til begyndelsen, hvad angår miljøet.
	HTML += 	'<h4>Citatforklaring:</h4>';
	HTML += 	contentOf2('p','#textArea_7_1');  		// Step 7: Forklar dit citat, idet du fremhæver enkelte ord fra det valgte tekststykke, som tydeliggør kontrasten.
	HTML += 	'<h4>Morale:</h4>';
	HTML += 	contentOf2('p','#textArea_8_1');  		// Step 8: Forklar nu med dine egne ord, hvad H.C. Andersen mener med eventyrets morale, og hvordan hele eventyret er med til at gøre denne pointe tydelig.
	HTML += 	'<h4>Afslutning:</h4>';
	HTML += 	contentOf2('p','#textArea_9_1');  		// Step 9: Afslutning

	HTML += 	'<br>';
	HTML += 	'<hr>';
	HTML += 	'<div class="instruction">';
	HTML += 		'<p>';
	HTML += 	    	'Når du er færdig med at gennemskrive og rette skal du både aflevere dit oprindelige dokument samt den færdige tekst. Begge tekster skal uploades i Moodle der hvor du begyndte på opgaven.';
	HTML += 		'</p>';
	HTML += 	'</div>';

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}




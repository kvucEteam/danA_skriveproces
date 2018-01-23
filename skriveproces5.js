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

function external_template1(dataObj1, dataObj2) {
	console.log('\nexternal_template1 - EXTERNAL TEST-TEMPLATE CALLED!')
	console.log('external_template1 - dataObj1: ' + JSON.stringify(dataObj1));
	console.log('external_template1 - dataObj2: ' + JSON.stringify(dataObj2));
}


// $( document ).on('click', "#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p, #summeryContainer i", function(event){   // COMMENTED OUT 02-01-2018
$( document ).on('click', ".fieldData", function(event){																										// ADDED 02-01-2018
	console.log('editText - api: ' + JSON.stringify(wpc.api));
	
	window.sthis = this;
	window.sid = $(this).attr('data-id').replace('#', '');
	window.sheading = $(this).attr('data-heading');
	window.stagName = $(this).prop("tagName").toLowerCase();

	console.log('CLICK summeryContainer - sid: ' + sid + ', sheading: ' + sheading);

	var HTML = '<h4>'+sheading+'</h4>';
	HTML += '<textarea id="'+sid+'" class="autoSaveOff"></textarea>';
	HTML += '<span class="save summerySave btn btn-info">GEM</span>';
	wpc.template_userMsgBox({id: "summeryTemplate"}, HTML);
});


$( document ).on('click', ".summerySave", function(event){
	var value = $('#'+sid).val().trim();
	if (value.length>0) { // If the user has entered some data...
		$(sthis).text(value);
	} else {
		$(sthis).parent().replaceWith(contentOf(stagName, sid, sheading));
	}

	wpc.api.userData['#'+sid] = value;
	wpc.close_template_userMsgBox(null);
	osc.save('apiData', wpc.api);

	console.log('CLICK summerySave - value: ' + value + ', sid: ' + sid);
});


function contentOf(parentTag, userDataId, heading) {
console.log('contentOf - parentTag: ' + parentTag + ', userDataId: ' + userDataId + ', heading: ' + heading + ', wpc.api.userData.hasOwnProperty('+userDataId+'): ' + wpc.api.userData.hasOwnProperty(userDataId));

	// return '<'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';

	// return '<div class="contentWrap"> <span class="glyphicon glyphicon-pencil"></span> <'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
	// return '<div class="contentWrap"> <'+parentTag+' data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';  					 // <----  COMMENTED OUT 02-01-2018
	return '<div class="contentWrap"> <'+parentTag+' class="fieldData" data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId) && (wpc.api.userData[userDataId]!==''))? wpc.api.userData[userDataId] : '<span class="emptyField">[Indsæt ' + heading.toLowerCase() + ']</span>')+'</'+parentTag+'> </div><div class="Clear"></div>';	// <------ ADDED 02-01-2018
}



function contentOf2(parentTag, userDataId) {
	
	return '<'+parentTag+'>'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';
}


var step5_text = $('#step_clipborad_5 .text_5_1').html();
console.log('external_template1 - step5_text: ' + step5_text);



// FRA ERWIN'S SKRIVEGUIDE
function summery(selector) {
	console.log('\nEXTERNAL FUNCTION summery - CALLED');

	var HTML = '';

	HTML += '<div id="summeryContainer">';
	
	// HTML += 	step5_text;

	HTML += 	'<h4>Opgave 1:</h4>';
	HTML += 	contentOf('p','#textArea_3_1', 'Opgave 1');  		

	HTML += 	'<h4>Opgave 2:</h4>';
	HTML += 	contentOf('p','#textArea_4_1', 'Opgave 2');  		


	HTML += '</div>';
	
	$(selector).html(HTML);

	// $('#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p').wrap("<span class='glyphicon glyphicon-pencil'></span>");
}


// function download() {
// 	console.log('\nEXTERNAL FUNCTION download - CALLED');

// 	var HTML = wordTemplate();
// 	// var HTML = "TEST DOWNLOAD"; 
	
// 	var converted = htmlDocx.asBlob(HTML);
//     console.log("EXTERNAL FUNCTION download - converted: " + JSON.stringify(converted));
// 	saveAs(converted, 'Min analyse - globryllup.docx');
// }


// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// The btn #submit by input type="submit" has a diffrent CSS-style... therefore another btn .download is used and click on the #submit btn.
function download() {  
	var HTML = '';
	HTML += '<form action="htmlToWord.php" method="post">';
    HTML += 	'<input type="hidden" name="fileName" id="hiddenField" value="Min analyse - globryllup" />';
    HTML += 	'<input id="html" type="hidden" name="html" id="hiddenField" />';
    HTML += 	'<input id="submit" type="submit" class="btn btn-info" value="Konverter" onclick="clearInterval(downloadTimer);">';  // <---- NOTE: The "downloadTimer" is cleared here!
    HTML += '</form>';
    $('#interface').append(HTML);
}

// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// If this is not present, some browseres starts to download an empty htmlToWord.php file instead of the intended .docx file.
$( document ).on('click', '#submit', function(){  
    console.log('#submit - CLICKED - submit');
    $('#html').val(wordTemplate());
});

// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// Some browsers need two clicks on the ".download" btn before the download starts. Therefore a timer is set to loop untill the variable "downloadTimer" is cleared.
$( document ).on('click', '.download', function(){    
	console.log('.download - CLICKED - submit');
    window.Tcount = 0;
	window.downloadTimer = setInterval(function(){  // <---- NOTE: The "downloadTimer" is cleared inline in the input-tag "#submit"
		$('#submit').trigger('click');
		++Tcount;
		console.log('download - CLICKED - Tcount: ' + Tcount);
	}, 200);
});


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
	// HTML += 			'ul {font-size: 14px;}';
	HTML += 			'#author div {display: inline-block;}';
	HTML += 			'.instruction {color: #999;}';
	HTML += 			'.instruction2 {background-color: #acefed; padding: 10px 10px 10px 10px; margin-bottom: 25px; font-size: 14px;}';  // g2
	HTML += 			'.preText {background-color: #e7e6e2; padding: 10px 10px 10px 10px; margin-bottom: 25px}';
	HTML +=				'.marginAjust {padding-bottom: -10px}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';

	HTML += 	'<table class="instruction2">';
	HTML += 		'<h3>Til det videre arbejde</h3>';
	// HTML += 		'<p>';
	HTML += 			'Du skal nu skabe en sammenhængende opgave ved hjælp af din analyse og den eksemplariske besvarelse. Du skal derfor gøre følgende:';
	// HTML += 		'</p>';
	HTML += 		'<ul>';
	HTML += 			'<li>';
	HTML += 				'Skab en sammenhæng fra der hvor den eksemplariske opgave slutter til der hvor din del begynder';
	HTML += 			'</li>';
	HTML += 			'<li>';
	HTML += 				'Gennemskriv dine analyseafsnit, så de er sammenhængende og uden sproglige fejl';
	HTML += 			'</li>';
	HTML += 			'<li>';
	HTML += 				'Formuler mellemrubrikker til dine to afsnit samt en til to mellemrubrikker i eksempelanalysen';
	HTML += 			'</li>';
	HTML += 			'<li>';
	HTML += 				'Skriv en afslutning til din tekst, hvor du kort og præcist opsummerer dine hovedpointer fra analysen, og tilføjer en afsluttende sætning, så din tekst ikke slutter pludseligt og uden at der rundes af';
	HTML += 			'</li>';
	HTML += 			'<li>';
	HTML += 				'Udskift den nuværende rubrik (Analyse af Globryllup Helle Helle) med en rubrik du selv formulerer. Rubrikken skal være både dækkende og den skal indfange din læser';
	HTML += 			'</li>' ;
	HTML += 		'</ul>';
	HTML += 	'</table>';
	// HTML += 	'<hr>';
	HTML += 	'<br>';
	
	HTML += 	'<table class="preText">';
	HTML += 		step5_text;
	HTML += 	'</table>';

	HTML += 	'<h4>Mellemrubrik:</h4>';
	HTML += 	contentOf('p','#textArea_3_1', 'Citater');  		

	HTML += 	'<h4>Mellemrubrik:</h4>';
	HTML += 	contentOf('p','#textArea_4_1', 'Begreberne face og facework');  		

	HTML += 	'<br>';
	// HTML += 	'<hr>';
	HTML += 	'<table class="instruction2 marginAjust">';
	// HTML += 		'<p>';
	HTML += 	    	'Afsluttende sætning: Upload nu din opgave i Moodle under opgave 6.3.';
	// HTML += 		'</p>';
	HTML += 	'</table>';

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}




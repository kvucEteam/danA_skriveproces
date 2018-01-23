//################################################################################################################
// 
// 				TEST FUNKTIONER TIL SKRIVEGUIDE MED ERWIN PHLAN	-	28/6-2017
//
//################################################################################################################

function external_template1(dataObj1, dataObj2) {
	console.log('\nexternal_template1 - EXTERNAL TEST-TEMPLATE CALLED!')
	console.log('external_template1 - dataObj1: ' + JSON.stringify(dataObj1));
	console.log('external_template1 - dataObj2: ' + JSON.stringify(dataObj2));
}


var tranferLookUp = {
	".save_hvad" : {
		userData: {from: "#textArea_7_1", to: ["#textArea_6_1"]},
		markup: {from: "#textArea_7_1", to: [".workQuestion_data"]}
	},
	".save_hvordan_1": {
		userData: {from: "#textArea_8a_1", to: ["#textArea_6_2"]},
		markup: {from: "#textArea_8a_1", to: [".workQuestion_data"]}
	},
	".save_hvordan_2": {
		userData: {from: "#textArea_11_2", to: ["#textArea_6_3"]},
		markup: {from: "#textArea_11_2", to: [".workQuestion_data"]}
	}
}


function tranferData(selector) {
	console.log('\nEXTERNAL FUNCTION tranferData - CALLED');

	console.log('EXTERNAL FUNCTION tranferData - selector: ' + selector);

	// var key = selector.replace('.', '').replace('#', '');

	var lt = tranferLookUp[selector];

	console.log('EXTERNAL FUNCTION tranferData - wpc.api.userData 1: ' + JSON.stringify(wpc.api.userData));

	for (var n in lt.userData.to) {
		wpc.api.userData[lt.userData.to[n]] = wpc.api.userData[lt.userData.from];
	}

	for (var n in lt.markup.to) {
		console.log('EXTERNAL FUNCTION tranferData - lt.markup.to['+n+']: ' + lt.markup.to[n]);
		$(String(lt.markup.to[n])).html(wpc.api.userData[lt.markup.from]);
	}

	console.log('EXTERNAL FUNCTION tranferData - wpc.api.userData 2: ' + JSON.stringify(wpc.api.userData));
}



function collectDataFrom_taenkeskrivning(selector) {
	console.log('\nEXTERNAL FUNCTION collectDataFrom_taenkeskrivning - CALLED');

	var HTML = '';

	HTML += '<h1>Dine noter fra tænkeskrivning</h1>';

	HTML += '<h2>Side 2</h2>';
	HTML += '<h4>Emnet:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_2_2'))? wpc.api.userData['#textArea_2_2'] : '')+'</p>';
	HTML += '<h4>Forventninger til dig:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_2_3'))? wpc.api.userData['#textArea_2_3'] : '')+'</p>';

	HTML += '<h2>Side 3</h2>';
	HTML += '<h4>Resumé af primærteksten:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_3_1'))? wpc.api.userData['#textArea_3_1'] : '')+'</p>';
	HTML += '<h4>Resumé af sekundærteksten:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_3_2'))? wpc.api.userData['#textArea_3_2'] : '')+'</p>';
	HTML += '<h4>Resumé af tekster fundet på internettet:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_3_3'))? wpc.api.userData['#textArea_3_3'] : '')+'</p>';

	HTML += '<h2>Side 4</h2>';
	HTML += '<h4>Citater fra primærteksten eller videoen:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_4_1'))? wpc.api.userData['#textArea_4_1'] : '')+'</p>';
	HTML += '<h4>Citater fra sekundærteksten eller videoen:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_4_2'))? wpc.api.userData['#textArea_4_2'] : '')+'</p>';
	HTML += '<h4>Citater fra tekster fundet på internettet:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_4_3'))? wpc.api.userData['#textArea_4_3'] : '')+'</p>';

	HTML += '<h2>Side 5</h2>';
	HTML += '<h4>Alle begreber:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_5_1'))? wpc.api.userData['#textArea_5_1'] : '')+'</p>';
	HTML += '<h4>De tre bedste begreber og deres betydning:</h4>';
	HTML += '<p>'+((wpc.api.userData.hasOwnProperty('#textArea_5_2'))? wpc.api.userData['#textArea_5_2'] : '')+'</p>';
	
	$(selector).html(HTML);
}


function hideContent(content){
	$('.MsgBox_bgr').addClass('hideContent').attr('data-hideContent', content.target);

	var targetArr = content.target.split(' ');

	for (var n in targetArr) {
		$(targetArr[n]).hide();
	}
}


$( document ).on('click', ".hideContent", function(event){
	var target = $(this).attr('data-hideContent');

	var targetArr = target.split(' ');

	for (var n in targetArr) {
		$(targetArr[n]).fadeIn('slow');
	}

	$('.hideContent').remove();
});




//#########################################################################################################################################################################




// $( document ).on('click', "#summeryContainer h1, #summeryContainer h3, #summeryContainer span, #summeryContainer p, #summeryContainer i", function(event){
// 	console.log('editText - api: ' + JSON.stringify(wpc.api));
	
// 	window.sthis = this;
// 	window.sid = $(this).attr('data-id').replace('#', '');
// 	window.sheading = $(this).attr('data-heading');

// 	var HTML = '<h4>'+sheading+'</h4>';
// 	HTML += '<textarea id="'+sid+'" class="autoSaveOff"></textarea>';
// 	HTML += '<span class="save summerySave btn btn-info">GEM</span>';
// 	wpc.template_userMsgBox({id: "summeryTemplate"}, HTML);
// });

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


// function contentOf(parentTag, userDataId, heading) {
// 	// return '<'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'>';

// 	// return '<div class="contentWrap"> <span class="glyphicon glyphicon-pencil"></span> <'+parentTag+' data-id="'+userDataId+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
// 	return '<div class="contentWrap"> <'+parentTag+' data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
// }

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

	HTML += 	contentOf('h1','#textArea_14_1', 'Rubrik');  		// Step 14: Rubrik
	HTML += 	contentOf('h3','#textArea_15_1', 'Underrubrik');  		// Step 15: Underrubrik
	HTML += 	'<h4>Indledning</h4>';
	HTML += 	contentOf('p','#textArea_13_1', 'Indledning');  		// Step 13: Indledning
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_1"></textarea>'; 
	HTML += 	'<h4>Indtroduktion</h4>';
	HTML += 	contentOf('p','#textArea_7_2', 'Indtroduktion');  		// Step 13: Indledning 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_2"></textarea>'; 
	HTML += 	'<h4>Analyse</h4>';
	HTML += 	'<h5><b>Anslag for analyseafsnit</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_2', 'Anslag for analyseafsnit');  		// Step 13: Indledning 
	HTML += 	'<h5><b>Besvarelse af hvordan/hvilke-spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_3', 'Besvarelse af hvordan/hvilke-spørgsmål'); 
	HTML += 	'<h5><b>karakteristik el. undersøgelse</b></h5>';
	HTML += 	contentOf('p','#textArea_8b_1', 'karakteristik el. undersøgelse'); 
	HTML += 	'<h5><b>Begreber</b></h5>';
	HTML += 	contentOf('p','#textArea_9_1', 'Begreber'); 
	HTML += 	'<h5><b>Primærtekstens svage led</b></h5>';
	HTML += 	contentOf('p','#textArea_10_1', 'Primærtekstens svage led'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_3"></textarea>';  
	HTML += 	'<h4>Perspektiverende diskussion</h4>';
	HTML += 	contentOf('p','#textArea_11_1', 'Perspektiverende diskussion'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	'<textarea id="textArea_16_4"></textarea>'; 
	HTML += 	'<h4>Afslutning</h4>';
	HTML += 	contentOf('p','#textArea_12_1', 'Afslutning'); 


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
// 	saveAs(converted, 'Min analyse - den grimme ælling.docx');
// }


// ADDED 18/1-2018 - HTML-to-Word-conversion by PHP
// The btn #submit by input type="submit" has a diffrent CSS-style... therefore another btn .download is used and click on the #submit btn.
function download() {  
	var HTML = '';
	HTML += '<form action="htmlToWord.php" method="post">';
    HTML += 	'<input type="hidden" name="fileName" id="hiddenField" value="Den introducerende artikel" />';
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
	HTML += 			'ul {font-size: 14px;}';
	HTML += 			'#author div {display: inline-block;}';
	HTML += 			'.instruction {color: #999;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	
	HTML += 	contentOf('h1','#textArea_14_1', 'Rubrik');  		// Step 14: Rubrik
	HTML += 	contentOf('h3','#textArea_15_1', 'Underrubrik');  		// Step 15: Underrubrik
	HTML += 	'<h4>Indledning</h4>';
	HTML += 	contentOf('p','#textArea_13_1', 'Indledning');  		// Step 13: Indledning
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_1', 'Mellemrubrik');
	HTML += 	'<h4>Indtroduktion</h4>';
	HTML += 	contentOf('p','#textArea_7_2', 'Indtroduktion');  		// Step 13: Indledning 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_2', 'Mellemrubrik');
	HTML += 	'<h4>Analyse</h4>';
	HTML += 	'<h5><b>Anslag for analyseafsnit</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_2', 'Anslag for analyseafsnit');  		// Step 13: Indledning 
	HTML += 	'<h5><b>Besvarelse af hvordan/hvilke-spørgsmål</b></h5>';
	HTML += 	contentOf('p','#textArea_8a_3', 'Besvarelse af hvordan/hvilke-spørgsmål'); 
	HTML += 	'<h5><b>karakteristik el. undersøgelse</b></h5>';
	HTML += 	contentOf('p','#textArea_8b_1', 'karakteristik el. undersøgelse'); 
	HTML += 	'<h5><b>Begreber</b></h5>';
	HTML += 	contentOf('p','#textArea_9_1', 'Begreber'); 
	HTML += 	'<h5><b>Primærtekstens svage led</b></h5>';
	HTML += 	contentOf('p','#textArea_10_1', 'Primærtekstens svage led'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_3', 'Mellemrubrik');
	HTML += 	'<h4>Perspektiverende diskussion</h4>';
	HTML += 	contentOf('p','#textArea_11_1', 'Perspektiverende diskussion'); 
	HTML += 	'<h4>Mellemrubrik</h4>';
	HTML += 	contentOf('p','#textArea_16_4', 'Mellemrubrik');
	HTML += 	'<h4>Afslutning</h4>';
	HTML += 	contentOf('p','#textArea_12_1', 'Afslutning'); 

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}






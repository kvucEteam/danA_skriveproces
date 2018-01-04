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

	HTML += 	contentOf('h1','#textArea_10_1', 'Overskrift');  		// Step 10: Overskrift
	HTML += 	'<div id="author">';
	HTML += 		contentOf('span','#inputField_1_1', 'Titel')+' af ';  	// Step 1: Titel
	HTML += 		contentOf('span','#inputField_1_2', 'Forfatter')+', ';  	// Step 1: Forfatter
	HTML += 		contentOf('span','#inputField_1_3', 'Årstal');  	// Step 1: Årstal
	HTML += 	'</div>';
	HTML += 	'<h4>Indledning:</h4>';
	HTML += 	contentOf('p','#textArea_10_2', 'Indledning');  		// Step 10: Indledning
	HTML += 	'<h4>Genre begrundelse:</h4>';
	HTML += 	contentOf('p','#textArea_2_1', 'Genre begrundelse');  		// Step 2: Formulér ca. 10 linjer hvori du viser, at "Den grimme ælling" er et eventyr. 
	HTML += 	'<h4>Citat der begrunder genre:</h4>';
	// HTML += 	contentOf('i','#textArea_3_1');  		// Step 3: Citat
	HTML += 	contentOf('p','#textArea_3_1', 'Citat der begrunder genre');  
	HTML += 	'<h4>Begrundelse for valg af citat:</h4>';
	HTML += 	contentOf('p','#textArea_4_1', 'Begrundelse for valg af citat');  		// Step 4: Forklar hvorfor dit citat viser, at teksten tilhører genren eventyr.
	HTML += 	'<h4>Miljøbeskrivelse:</h4>';
	HTML += 	contentOf('p','#textArea_5_1', 'Miljøbeskrivelse');  		// Step 5: Beskriv kort miljøet, som det fremstilles i eventyrets første 15 linjer.
	HTML += 	'<h4>Citat om kontrast i miljøet:</h4>';
	// HTML += 	contentOf('i','#textArea_6_1');  		// Step 6: Find et citat fra et andet sted i teksten, som du synes står i kontrast til begyndelsen, hvad angår miljøet.
	HTML += 	contentOf('p','#textArea_6_1', 'Citat om kontrast i miljøet');
	HTML += 	'<h4>Citatforklaring:</h4>';
	HTML += 	contentOf('p','#textArea_7_1', 'Citatforklaring');  		// Step 7: Forklar dit citat, idet du fremhæver enkelte ord fra det valgte tekststykke, som tydeliggør kontrasten.
	HTML += 	'<h4>Morale og fortolkning:</h4>';
	HTML += 	contentOf('p','#textArea_8_1', 'Morale og fortolkning');  		// Step 8: Forklar nu med dine egne ord, hvad H.C. Andersen mener med eventyrets morale, og hvordan hele eventyret er med til at gøre denne pointe tydelig.
	HTML += 	'<h4>Afslutning og perspektivering:</h4>';
	HTML += 	contentOf('p','#textArea_9_1', 'Afslutning og perspektivering');  		// Step 9: Afslutning


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
	HTML += 		'<h3>Til det videre arbejde</h3>';
	HTML += 		'<p>';
	HTML += 			'Inden du går i gang med det videre arbejde, skal du kopiere og gemme dette dokument i sin nuværende form. Vi vil nemlig gerne have, at du til sidst afleverer både dokumentet, som det ser ud nu og din endeligt gennemarbejde tekst. Du skal med andre ord aflevere to udgaver af din tekst. Det skal du, da vi gerne vil kunne give dig feedback på både den første del af din skriveproces og på det færdige resultat.';
	HTML += 		'</p>';
	HTML += 		'<p>';
	HTML += 			'Opgaven træner dig i at blive bevidst om, hvad der skal til for at løfte teksten fra det indledende arbejde med skriveguiden, til at skrive med øje for den læser, som skal læse teksten.';
	HTML += 		'</p>';
	HTML += 		'<p>';
	HTML += 			'Når du er færdig med at gennemskrive og rette dit rå-arbejde fra skriveguiden, skal de to udgaver af din tekst afleveres i ét samlet word-dokument.';
	HTML += 		'</p>';
	HTML += 		'<ul>';
	HTML +=             'I det videre arbejde skal du være opmærksom på det følgende:';
	HTML += 			'<li>';
	HTML += 				'Læs dine afsnit igennem. Gør teksten så klar, præcis og sammenhængende som muligt.';
	HTML += 			'</li>';
	HTML += 			'<li>';
	HTML += 				'Skriv nogle gode og logiske overgange imellem de forskellige afsnit. Som en del af dette arbejde skal du sørge for at ændre afsnittenes overskrifter, så de tydeligere knytter an til tekstens indhold og gør din læseren interesseret i det, de skal læse.';
	HTML += 			'</li>';
	HTML += 			'<li>';
	HTML += 				'Kig på din indledning og afrunding, og overvej, om de fungerer godt eller om de skal forbedres.';
	HTML += 			'</li>';
	HTML += 			'<li>';
	HTML += 				'Kig på dit sprog. Er det godt og levende og med så få formuleringsmæssige uklarheder og stavefejl som muligt?';
	HTML += 			'</li>' ;
	HTML += 		'</ul>';
	HTML += 	'</div>';
	HTML += 	'<hr>';
	HTML += 	'<br>';
	
	HTML += 	contentOf2('h1','#textArea_10_1');  		// Step 10: Overskrift
	HTML += 	'<div id="author">';
	HTML += 		contentOf2('span','#inputField_1_1')+' af ';  	// Step 1: Titel
	HTML += 		contentOf2('span','#inputField_1_2')+', ';  	// Step 1: Forfatter
	HTML += 		contentOf2('span','#inputField_1_3');  			// Step 1: Årstal
	HTML += 	'</div>';
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
	// HTML += 	'<div class="instruction">';
	// HTML += 		'<p>';
	// HTML += 	    	'Når du er færdig med at gennemskrive og rette skal du både aflevere dit oprindelige dokument samt den færdige tekst. Begge tekster skal uploades i Moodle der hvor du begyndte på opgaven.';
	// HTML += 		'</p>';
	// HTML += 	'</div>';

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}




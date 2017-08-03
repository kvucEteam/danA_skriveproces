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


//################################################################################################################
// 
// 				FUNKTIONER TIL SKRIVEGUIDE MED ERWIN PHLAN	-	16/6-2017
//
//################################################################################################################


var JST = {};

var alalysis_intro = ''+
	'<div class="text_chapter">'+
		'<h4>Hvad er en indledning?</h4>'+
		'<p>Indledningens grundlæggende funktion er at skabe interesse hos læseren. Men hvordan gør man'+
		'dette? Der findes mange måder at skrive en indledning på. Én af de mest anvendte'+
		'indledningsversioner er kendt som ’tragt-indledningen’. Denne type indledning starter oftest med'+
		'en generel påstand eller et opsigtsvækkende citat fra primærteksten, hvis hensigt er at få læseren'+
		'til at undre sig. Ideen er så, at jo længere ind i indledningen læseren kommer, des mere konkret'+
		'bliver emnet (den røde tråd) og formålet med opgaven.</p>'+
			
		'<div>'+
			'<h4>Eksempel på indledningens anslag:</h4>'+
			'<p>Vi kender det alle sammen. Der er ting, vi kan tillade os at sige i det offentlige rum, og der er ting, vi ikke kan tillade os at sige. Hvis vi overskrider grænsen for, hvad der anses for at være god samtalekultur, får vi på puklen. Det var det, som skete for det tidligere medlem af Folketinget Søren Krarup fra Dansk Folkeparti, da han i programmet ”Debatten” kaldte den nyvalgte franske præsident Emmanuel Macron for en ”lille bøssedreng”. Reaktionerne på diverse sociale medier vidner om, hvor langt over stregen Krarup rent faktisk gik.</p>'+
		'</div>'+
		'<div>'+
			'<ul>'+
				'<li>En konkret situation</li>'+
				'<li>Et citat (fulgt af kommentar der forklarer hvad du vil med det)</li>'+
				'<li>Et aktuelt perspektiv</li>'+
				'<li>En personlig oplevelse (hvem kan tjekke om den er sand?!)</li>'+
				'<li>En påstand</li>'+
				'<li>En direkte læserhenvendelse</li>'+
			'<ul>'+
		'</div>'+
		
		'<div>'+
			'<h4>Eksempel på introduktion af emnet:</h4>'+
			'<p>Det er tankevækkende, at verdenssamfundet endnu ikke er gået til grunde, hvis man tagerklodens befolkningsantal i betragtning. Tænk på, hvor let det er at misforstå hinanden.Tænk på, hvor let det kan være at fortale sig. Tænk på, hvor mange samtaler, der finder sted i netop dette øjeblik. Men hvad er det, som gør, vi ikke fare mere i flæsket på hinanden, end vi gør? Et af svarene på dette spørgsmål kunne være: samtalekulturen. I et demokratisk samfund som vores er vi afhængige af en god og hensynsfuld samtalekultur.</p>'+
		'</div>'+
		'<div>'+
			'<p>Emnet set i et bredere perspektiv...</p>'+
			'<ul>'+
				'<li>historisk</li>'+
				'<li>samfundsmæssigt</li>'+
				'<li>kulturelt</li>'+
				'<li>politisk</li>'+
			'<ul>'+
		'</div>'+

		'<div>'+
			'<h4>Eksempel på præsentation af primærteksten:</h4>'+
			'<p>Et firma, som deler denne mening, er mobilselsskabet Call me. Den 17. april 2015 offentliggjorde de reklamevideoen Hvilken stemme giver du videre? Tal ordentligt, det koster ikke noget!, der viser, hvordan dårlig samtalekultur går i arv fra forældre til børn. Karakteristisk for reklamefilmen er, at børnenes stemmer og kropssprog er blevet udskiftet med voksenstemmer og dertilhørende mimik, hvilket gør, at filmen formidler sit budskab effektivt.</p>'+
		'</div>'+
		'<div>'+
			'<p>Præsenter nu primærteksten som et eksempel på det emne, din opgave behandler.</p>'+
			'<ul>'+
				'<li>I en god præsentation af primærteksten (og tekster generelt) oplyses der altid de mere faktuelle informationer, såsom: ”titel”, årstal, udgivelsessted, skribentens navn og profession.</li>'+
			'<ul>'+
		'</div>'+

		'<div>'+
			'<h4>Eksempel på indledningens afslutning::</h4>'+
			'<p>Umiddelbart er samtalekultur et ret bredt begreb, og der findes mange måder at tale sammen på. Så hvad kendetegner god og dårlig samtalekultur? Og hvilken form for samtalekultur er udbredt i det offentlige rum i dag, samt hvilket ansvar har vi selv, når det kommer til samtalekulturen i Danmark?</p>'+
		'</div>'+
		'<div>'+
			'<ul>'+
				'<li>Slut din indledning af med at skrive to eller tre spørgsmål til emnet, som din introducerende artikel vil undersøge. Spørgsmålene fungerer som retning for opgavens fokus, men også som en måde at gøre læseren nysgerrig. Husk altid, besvare disse spørgsmål i løbet af din opgave og til sidst i konklusionen. En god ide er at formulere det første spørgsmål som et ’hvad-spørgsmål’ og det andet som et ’hvordan-spørgsmål’ eller ’hvilke-spørgsmål’. Med et ’hvad- spørgsmål’ har du mulighed for at introducere læseren for den væsentligste fagterminologi og viden inden for emnet. ’Hvordan-spørgsmålet’ eller ’hvilket-spørgsmålet’ besvarer du i dit analyseafsnit.</li>'+
			'<ul>'+
		'</div>'+
	'</div>';


var alalysis_how = 'alalysis_how';



function template_test() {

	var HTML = '';
	HTML += '<h1>Den introducerende artikel</h1>';
	HTML += '<h2>Indledning</h2>';
	HTML += '<div id="alalysis_intro" class="btn btn-info">HVAD ER EN INDLEDNING</div>';
	HTML += '<div id="alalysis_how" class="btn btn-info">HVORDAN + EKSEMPEL</div>';
	HTML += '<p class="text">Svar på dit arbejdsspørgsmål...</p>';
	// HTML += '<input type="text" class="" placeholder="" aria-describedby="sizing-addon2">';
	HTML += '<textarea id="textInputTheme" val="" name="textareaFocus">';
					if (JST.hasOwnProperty('TextTheme')) {
						HTML += JST.TextTheme;
					}			
	HTML += '</textarea>';
	return HTML;
}


$( document ).on('click', "#alalysis_intro", function(event){
	UserMsgBox('body', alalysis_intro);
});


$( document ).on('click', "#alalysis_how", function(event){
	UserMsgBox('body', JSON.stringify(alalysis_how));
});





var OLD_alalysis_intro = ''+
	'<div class="text_chapter">'+
		'<h4>Hvad er en indledning?</h4>'+
		'<p>Indledningens grundlæggende funktion er at skabe interesse hos læseren. Men hvordan gør man'+
		'dette? Der findes mange måder at skrive en indledning på. Én af de mest anvendte'+
		'indledningsversioner er kendt som ’tragt-indledningen’. Denne type indledning starter oftest med'+
		'en generel påstand eller et opsigtsvækkende citat fra primærteksten, hvis hensigt er at få læseren'+
		'til at undre sig. Ideen er så, at jo længere ind i indledningen læseren kommer, des mere konkret'+
		'bliver emnet (den røde tråd) og formålet med opgaven.</p>'+
		'<table>'+
			'<tr>'+
				'<td>'+
					'<h4>Indledningens anslag:</h4>'+
					'<b>Eksempel:</b><br>'+
					'Vi kender det alle sammen. Der er ting, vi kan tillade os at sige i det offentlige rum, og der er '+
					'ting, vi ikke kan tillade os at sige. Hvis vi overskrider grænsen for, hvad der anses for at '+
					'være god samtalekultur, får vi på puklen. Det var det, som skete for det tidligere medlem af '+
					'Folketinget Søren Krarup fra Dansk Folkeparti, da han i programmet ”Debatten” kaldte den '+
					'nyvalgte franske præsident Emmanuel Macron for en ”lille bøssedreng”. Reaktionerne på '+
					'diverse sociale medier vidner om, hvor langt over stregen Krarup rent faktisk gik. '+
				'</td>'+
				'<td>'+
					'<p>En konkret situation</p>'+
					'<p>Et citat (fulgt af kommentar der forklarer hvad du vil med det)</p>'+
					'<p>Et aktuelt perspektiv</p>'+
					'<p>En personlig oplevelse (hvem kan tjekke om den er sand?!)</p>'+
					'<p>En påstand</p>'+
					'<p>En direkte læserhenvendelse</p>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td>'+
					'<p>Introduktion af emnet:</p>'+
					'<b>Eksempel:</b><br>'+
					'Det er tankevækkende, at verdenssamfundet endnu ikke er gået til grunde, hvis man tagerklodens befolkningsantal i betragtning. Tænk på, hvor let det er at misforstå hinanden.Tænk på, hvor let det kan være at fortale sig. Tænk på, hvor mange samtaler, der finder sted i netop dette øjeblik. Men hvad er det, som gør, vi ikke fare mere i flæsket på hinanden, end vi gør? Et af svarene på dette spørgsmål kunne være: samtalekulturen. I et demokratisk samfund som vores er vi afhængige af en god og hensynsfuld samtalekultur.'+
				'</td>'+
				'<td>'+
					'<p>En konkret situation</p>'+
					'<p>Et citat (fulgt af kommentar der forklarer hvad du vil med det)</p>'+
					'<p>Et aktuelt perspektiv</p>'+
					'<p>En personlig oplevelse (hvem kan tjekke om den er sand?!)</p>'+
					'<p>En påstand</p>'+
					'<p>En direkte læserhenvendelse</p>'+
				'</td>'+
			'</tr>'+
		'</table>'+
	'</div>';







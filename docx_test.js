    var content = "<!DOCTYPE html> <html> <head> <style> body { font-family: arial; } h1 {} h2 {} h3 {} h4 {} h5 {} h6 {} </style> </head> <body> <h1>Skriv en debatartikel</h1> <hr/> <h2>Dit valgte emne </h2> <h3>Atomkraft</h3> <h2>Dine brainstorm-ord</h2> <table> <tr> <td>Atomkraft</td> <th>Pøllepostej</th> </tr> <tr> <td>Atomkraft2</td> </tr> <tr> <td>Atomkraft</td> <th>Pøllepostej</th> </tr> <tr> <td>Atomkraft2</td> </tr> </table> <h2>Dine sætninger skal nu udbygges til 5 afsnit. Skriv videre på din tekst</h2> <ul> <li>Forklar og uddyb hvad du mener med hver enkelt sætning</li> <li>Hurtigskriv et par minutter.</li> <li>Og hopla! Så er du kommet fra sætning til afsnit.</li> </ul> <h1>Atomkraft NU - hvorfor vente?</h1> <h2>Indledning</h2> <p>Alle kan blive enige om at det er et problem at vi nu har opbygget så meget af verdens energiforbrug på atomkraft, da det har så stor risiko for fremtiden knyttet til sig.</p> <h2>Midte</h2> <p>Hvis nogen skulle være i tvivl om at det er et problem at vi får så meget energi fra atomkraft, så bør man tænke på ulykken i Tjernobyl.</p> <p>Mit hovedsynspunkt er at det er uforsvarligt overfor fremtidens børn at bygge et energiforbrug op der har så ukendte konsekvenser for fremtiden.</p> <p>På den ene side kan man være for atomkraft, da der reelt er mange fordele ved at skrue op for brugen af atomkraft og derved mindske forbruget af fossile brændstoffer, indtil vi har bedre og renere energikilder i det omfang det kræves til den voksende verdensbefolkning. På den anden siden kan man være i mod atomkraft da man med rette kan hævde at vi reelt ikke hvad der vil ske med det opbevarede atomaffald.</p> <h2>Afslutning</h2> <p>Alle kan blive enige om at det er et problem at vi nu har opbygget så meget af verdens energiforbrug på atomkraft, da det har så stor risiko for fremtiden knyttet til sig.</p> <h2>Gennemlæs din tekst:</h2> <ul> <li>Hænger det sammen?</li> <li>Afsnit og overgange</li> <li>Sætning til sætning</li> <li>Afsnit til afsnit</li> </ul> <h2>Når du har gennemgået disse trin, har du en rigtig god tekst!</h2> </body> </html>";

    var converted = htmlDocx.asBlob(content);
    console.log(converted);


    $(".saveFile").click(function() {
        saveAs(converted, 'test.docx');
    });
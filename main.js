import { M } from "./js/model.js";
import { V } from "./js/view.js";


/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/
   

// loadind data (and wait for it !)
await M.init();

// sample events for testing
/*let edt = [
  {
    id: '1',
    calendarId: '1',
    title: 'my event',
    category: 'time',
    start: '2023-12-11T08:30:00',
    end: '2023-12-11T10:30:00',
  },
  {
    id: '2',
    calendarId: '1',
    title: 'second event',
    category: 'time',
    start: '2023-12-13T14:00:00',
    end: '2023-12-13T15:30:00',
  },
]
*/

// creating events in the calendar

let C = {}

V.uicalendar.createEvents( M.getEvents('mmi1') );
V.uicalendar.createEvents( M.getEvents('mmi2') );
V.uicalendar.createEvents( M.getEvents('mmi3') );

  let eventsmmi1 = M.getEvents('mmi1');
 for (let event of eventsmmi1) {
  let changes = {};
   if (event.title.includes('TP')) {
       changes.backgroundColor = '#6b66ff' ;
   }
  else if (event.title.includes('TD')) {
      changes.backgroundColor = '#0800e0' ;
  }
  else if (event.title.includes('CM')) {
      changes.backgroundColor =  '#050093'
  }
  else{
      changes.backgroundColor = '#9c99ff';
  }
    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
 }


 let eventsmmi2 = M.getEvents('mmi2');
 for (let event of eventsmmi2) {
  let changes = {};
   if (event.title.includes('TP')) {
       changes.backgroundColor = '#ff1d0a' ;
   }
  else if (event.title.includes('TD')) {
      changes.backgroundColor = '#d11000' ;
  }
  else if (event.title.includes('CM')) {
      changes.backgroundColor =  '#8d0b00'
  }
  else{
      changes.backgroundColor = '#ff6457';
  }
    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
 }



 let eventsmmi3 = M.getEvents('mmi3');
 for (let event of eventsmmi3) {
  let changes = {};
   if (event.title.includes('TP')) {
       changes.backgroundColor = '#13fa00' ;
   }
  else if (event.title.includes('TD')) {
      changes.backgroundColor = '#13b800' ;
  }
  else if (event.title.includes('CM')) {
      changes.backgroundColor =  '#095800'
  }
  else{
      changes.backgroundColor = '#6dff61';
  }
    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
 }
 V.uicalendar.render();



let semaine = document.querySelector('#semaine');

C.handler_clickonsemaine = function(ev){
  if(ev.target.id == "prev"){
    V.uicalendar.prev();
  }
  if(ev.target.id == "today"){
    V.uicalendar.today();
  }
  if(ev.target.id == "next"){
    V.uicalendar.next();
  }
};
 
semaine.addEventListener('click' , C.handler_clickonsemaine);


let année = document.querySelector("#annees");



C.handler_clickoncheckbox = function(ev){
if(ev.target.id == "mmi1" && ev.target.checked){
  V.uicalendar.setCalendarVisibility("mmi1", true);
}
else if( ev.target.id == "mmi1" && ev.target.checked == false){
  V.uicalendar.setCalendarVisibility("mmi1", false);
}
if(ev.target.id == "mmi2" && ev.target.checked){
  V.uicalendar.setCalendarVisibility("mmi2", true);
}
else if(ev.target.id == "mmi2" && ev.target.checked == false){
  V.uicalendar.setCalendarVisibility("mmi2", false);
}
if(ev.target.id == "mmi3" && ev.target.checked){
  V.uicalendar.setCalendarVisibility("mmi3", true);
}
else if(ev.target.id == "mmi3" && ev.target.checked == false){
  V.uicalendar.setCalendarVisibility("mmi3", false);
}
};

année.addEventListener('click' , C.handler_clickoncheckbox);


    // itération 5 

let select = document.getElementById("groupe");
let checkbox1 = document.getElementById("mmi1");
let checkbox2 = document.getElementById("mmi2");
let checkbox3 = document.getElementById("mmi3");

checkbox1.addEventListener("change", function(){
  for(let i = 0; i < select.options.length; i++){
    let option = select.options[i];
    let dataid = option.getAttribute("data-id");
    if(dataid == "BUT1"){
      if(checkbox1.checked){
        option.style.display = "block";
      }
      else{
        option.style.display = "none";
      }
    }
}
}
);

checkbox2.addEventListener("change", function(){
  for(let i = 0; i < select.options.length; i++){
    let option = select.options[i];
    let dataid = option.getAttribute("data-id");
    if(dataid == "BUT2"){
      if(checkbox2.checked){
        option.style.display = "block";
      }
      else{
        option.style.display = "none";
      }
    }
}
}
);

checkbox3.addEventListener("change", function(){
  for(let i = 0; i < select.options.length; i++){
    let option = select.options[i];
    let dataid = option.getAttribute("data-id");
    if(dataid == "BUT3"){
      if(checkbox3.checked){
        option.style.display = "block";
      }
      else{
        option.style.display = "none";
      }
    }
}
}
);



let groupe = document.querySelector("#groupe");


C.handler_selectgroupe = function(ev){
  let groupe = ev.target.value;
  if(groupe.includes('BUT1')){
    for (let event of eventsmmi1) {
      let changes = {};
      if (event.groupe.includes(groupe)) {
        changes.isVisible = true;
    }
    else {
      changes.isVisible = false;
    }
    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  }
  if(groupe.includes('BUT2')){
    for (let event of eventsmmi2) {
      let changes = {};
      if (event.groupe.includes(groupe)) {
        changes.isVisible = true;
    }
    else {
      changes.isVisible = false;
    }
    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  }
  if(groupe.includes('BUT3')){
    for (let event of eventsmmi3) {
      let changes = {};
      if (event.groupe.includes(groupe)) {
        changes.isVisible = true;
    }
    else {
      changes.isVisible = false;
    }
    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  }
};



groupe.addEventListener('change' , C.handler_selectgroupe);
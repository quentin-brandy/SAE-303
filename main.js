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

// creating events in the calendar

V.init = function(){
  let semaine = document.querySelector('#semaine');
  semaine.addEventListener('click' , C.handler_clickonsemaine);

  let année = document.querySelector("#annees");
  année.addEventListener('click' , C.handler_clickoncheckbox);

  let select = document.getElementById("groupe");
  select.addEventListener('change' , C.handler_selectgroupe);

  let search = document.querySelector("#search");
  search.addEventListener('input' , C.handler_search);

 
  année.addEventListener('click' , C.handler_annee);

  let dispo = document.getElementById('disposition')
  dispo.addEventListener('click', C.handler_disposition); 
}

let C = {}

V.uicalendar.createEvents( M.getallevents() );

 // handler pour le changer de jour / semaine / mois

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

 // handler pour la séléction de l'année de formation

C.handler_clickoncheckbox = function(ev){
if(ev.target.checked){
  let event = M.getEvents(ev.target.name)
  V.uicalendar.createEvents( event );
}
else if(  ev.target.checked == false){
  V.uicalendar.setCalendarVisibility(ev.target.name, false);
}
localStorage.setItem(ev.target.name, ev.target.checked);
};





    // itération 5 

// handler pour la séléction de l'année de formation

    C.handler_annee = function(ev){
      let select = document.getElementById("groupe");
      for(let i = 0; i < select.options.length; i++){
        let option = select.options[i];
        let dataid = option.getAttribute("data-id");
        if(dataid == ev.target.id){
          if(ev.target.checked){
            option.style.display = "block";
          }
          else{
            option.style.display = "none";
          }
        }
    }
    }
   
// handler pour la séléction des optionsa afficher dans le sélécteur ainsi qu ecréation des évènements à afficher en fonction du sélécteur
C.handler_selectgroupe = function(){
let mmi = [document.querySelector("#BUT1") , document.querySelector("#BUT2") , document.querySelector("#BUT3") ];
let select = document.getElementById("groupe");
let groupe = select.value;
V.checked(groupe);
let events = M.getallevents();
let filteredEvents = events.filter(event => event.groupe.includes(groupe));
console.log(filteredEvents);
let search = document.querySelector("#search");
if(search.value === ""){
V.uicalendar.clear();
V.uicalendar.createEvents(filteredEvents);
if(groupe =="0"){
  V.uicalendar.createEvents(events);
  mmi[0].checked = true;
  mmi[1].checked = true;
  mmi[2].checked = true;
  for(let i = 0; i < select.options.length; i++){
    let option = select.options[i];
    option.style.display = "block";
  }
  localStorage.setItem("mmi1", "true");
  localStorage.setItem("mmi2", "true");
  localStorage.setItem("mmi3", "true");
}
}
else{
 searchfonction(search);
  }
  localStorage.setItem("filtre", groupe);
};

//itération 6 et 7
// handler pour rechercher les évènemetn en fonction de se qui est tapé dans la barre de recherche
C.handler_search = function(ev){
  let select = document.getElementById("groupe");
  let value = select.value;
  let recherche = M.search(ev);
  let allevent = M.getallevents();
  let groupe = V.Presentevent(allevent);
  if(value === "0"){
    let filteredsearch = allevent.filter(event =>  recherche.every(recherche => event.title.toLowerCase().includes(recherche) || event.location.toLowerCase().includes(recherche)));
    V.uicalendar.clear();
    V.uicalendar.createEvents(filteredsearch);
  }
  else{
  let filteredsearch = groupe.filter(event =>  recherche.every(recherche => event.title.toLowerCase().includes(recherche) || event.location.toLowerCase().includes(recherche)));
  V.uicalendar.clear();
  V.uicalendar.createEvents(filteredsearch);
  }
  
  }

// itération 8

// handler pour changer  la vue

C.handler_disposition = function(ev) {
  let button = ev.target;
  let id = button.id;

  switch (id) {
    case 'day':
      V.uicalendar.changeView('day');
      break;
    case 'week':
      V.uicalendar.changeView('week');
      break;
    case 'month':
      V.uicalendar.changeView('month');
      break;
  }
  localStorage.setItem("format", id);
};

// itération 9 
// version men jour pour mobile
if (window.devicePixelRatio > 2) {
  V.uicalendar.changeView('day');
}


// itération 10 

// établissement des evènements a affiché en fonction du sélécteur d'après le localstorage
let selectandformatidentifier = function() {
let select = document.getElementById("groupe");
let cat = localStorage.getItem("filtre");
for (let i = 1; i < select.options.length; i++) {
  let option = select.options[i];
  if (option.value == cat) {
    option.selected = true;
    C.handler_selectgroupe();
    break;
    
  }
}
let format = localStorage.getItem("format");
V.uicalendar.changeView(format);
}


// Fonction de recherche d'évènements
let searchfonction = function(search){
  let value = search.value;
  let recherche = M.search2(value);
  let allevent = M.getallevents();
  let groupe = V.Presentevent(allevent);
  if(value === "0"){
    let filteredsearch = allevent.filter(event =>  recherche.every(recherche => event.title.toLowerCase().includes(recherche) || event.location.toLowerCase().includes(recherche)));
    V.uicalendar.clear();
    V.uicalendar.createEvents(filteredsearch);
  }
  else{
  let filteredsearch = groupe.filter(event =>  recherche.every(recherche => event.title.toLowerCase().includes(recherche) || event.location.toLowerCase().includes(recherche)));
  V.uicalendar.clear();
  V.uicalendar.createEvents(filteredsearch);
  }
}




// établissement de la valeur des checkbox d'après le localstorage
let checkboxvalue = function(){
let select = document.getElementById("groupe");
let checkboxmmi1 = localStorage.getItem("mmi1");
let checkboxmmi2 = localStorage.getItem("mmi2");
let checkboxmmi3 = localStorage.getItem("mmi3");
let checkboxid = [document.querySelector("#BUT1"), document.querySelector("#BUT2"), document.querySelector("#BUT3")];
if (select.value === "0") {
  var mmi1event, mmi2event, mmi3event;
  if (checkboxmmi1 == "true") {
    mmi1event = M.getEvents("mmi1");
  }
  else{
    checkboxid[0].checked = false;
  }
  if (checkboxmmi2 == "true") {
    mmi2event = M.getEvents("mmi2");
  }
  else{
    checkboxid[1].checked = false;
    }
  if (checkboxmmi3 == "true") {
    mmi3event = M.getEvents("mmi3");
  }
  else{
    checkboxid[2].checked = false;
    }
    V.localevent(mmi1event , mmi2event , mmi3event);
  
}
}


let preference = function(){
  checkboxvalue();
  selectandformatidentifier();
};


V.init();
preference();
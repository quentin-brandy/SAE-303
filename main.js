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

  let searchanne = document.querySelector("#annees");
  searchanne.addEventListener('click' , C.handler_annee);

  let dispo = document.getElementById('disposition')
  dispo.addEventListener('click', C.handler_disposition); 
}

let C = {}

V.uicalendar.createEvents( M.getallevents() );


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
 

C.handler_clickoncheckbox = function(ev){
if(ev.target.checked){
  let event = M.getEvents(ev.target.name)
  V.uicalendar.createEvents( event );
}
else if(  ev.target.checked == false){
  V.uicalendar.setCalendarVisibility(ev.target.name, false);
}
};





    // itération 5 
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
   

C.handler_selectgroupe = function(ev){
let groupe = ev.target.value;
let events = M.getallevents();
let filteredEvents = events.filter(event => event.groupe.includes(groupe));
console.log(filteredEvents);
let search = document.querySelector("#search");
if(search.value === ""){
V.uicalendar.clear();
V.uicalendar.createEvents(filteredEvents);
if(groupe =="0"){
  V.uicalendar.createEvents(events);
}
}
else{
 searchfonction(search);

  }
};

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




//itération 6 et 7

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


C.handler_disposition = function(ev) {
  let button = ev.target;
  let id = button.id;

  switch (id) {
    case 'jour':
      V.uicalendar.changeView('day');
      break;
    case 'semaine':
      V.uicalendar.changeView('week');
      break;
    case 'mois':
      V.uicalendar.changeView('month');
      
      break;
  }
};

// itération 9 

if (window.devicePixelRatio > 2) {
  V.uicalendar.changeView('day');
}




V.init();
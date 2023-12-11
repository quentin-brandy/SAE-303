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

C.init = async function(){
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

}

C.handler_clickcatonSelect = function(ev) {
  // get the selected value
  let value = ev.target.value;
  // log the event
  console.log(value);
  // switch on the value
  switch (value) {
    case "mmi1":
      // show mmi1 events and hide others
      V.uicalendar.toggleSchedules("mmi1", true);
      V.uicalendar.toggleSchedules("mmi2", false);
      V.uicalendar.toggleSchedules("mmi3", false);
      break;
    case "mmi2":
      // show mmi2 events and hide others
      V.uicalendar.toggleSchedules("mmi1", false);
      V.uicalendar.toggleSchedules("mmi2", true);
      V.uicalendar.toggleSchedules("mmi3", false);
      break;
    case "mmi3":
      // show mmi3 events and hide others
      V.uicalendar.toggleSchedules("mmi1", false);
      V.uicalendar.toggleSchedules("mmi2", false);
      V.uicalendar.toggleSchedules("mmi3", true);
      break;
    default:
      // handle invalid value
      console.error("Invalid value: " + value);
  }
};
C.init();
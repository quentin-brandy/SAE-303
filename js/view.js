import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';


let V = {};
     
V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  month: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  day: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
});

V.searchfonction = function(search){
  let value = search.value;
  let recherche = M.search2(value);
  let groupe = test();
  let allevent = M.getallevents();
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


V.Presentevent = function(events){
  let select = document.getElementById("groupe");
  let groupe = select.value;
  let filteredEvents = events.filter(event => event.groupe.includes(groupe));
  console.log(filteredEvents);
  return filteredEvents;
  };

  V.checked = function(groupe){
    let mmi = [document.querySelector("#BUT1") , document.querySelector("#BUT2") , document.querySelector("#BUT3") ];
    if(groupe.includes("BUT1")){
      mmi[0].checked = true;
      mmi[1].checked = false;
      mmi[2].checked = false;
    }
    else if(groupe.includes("BUT2")){
      mmi[0].checked = false;
      mmi[1].checked = true;
      mmi[2].checked = false;
    }
    else if(groupe.includes("BUT3")){
      mmi[0].checked = false;
      mmi[1].checked = false;
      mmi[2].checked = true;
    }
  }

  V.localevent = function(mmi1 ,mmi2 , mmi3){
    let mmi = [];
  if (mmi1 != null) {
    mmi.push(mmi1);
  }
  if (mmi2 != null) {
    mmi.push(mmi2);
  }
  if (mmi3 != null) {
    mmi.push(mmi3);
  }
  V.uicalendar.clear();
  for (let event of mmi) {
    V.uicalendar.createEvents(event);
  }
}
export { V };


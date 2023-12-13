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

export { V };


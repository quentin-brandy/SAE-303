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
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
 
});

/*let previous = document.querySelector('#prev');
previous.addEventListener('click',() =>  
 V.uicalendar.prev()
 );

let today = document.querySelector('#today');
 today.addEventListener('click',() =>  
  V.uicalendar.today()
  );

let next = document.querySelector('#next');
next.addEventListener('click',() =>  
 V.uicalendar.next()
 );

 V.init = async function(){
  let select = document.querySelector("#annees");
  select.addEventListener('change' , C.handler_clickcatonSelect);

 }*/
 
export { V };


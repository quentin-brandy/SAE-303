

class Event {
    #id;
    #summary;
    #description;
    #start;
    #end;
    #location;
    #groups;
    #year;
    #calendarColours = {
        mmi1: {
          CM: " #3680B7",
          TD: "#3A84B8",
          TP: "#3E88B9",
          Default: " #428BCA",
        },
        mmi2: {
          CM: "#BA8ED0",
          TD: "#BD93D1",
          TP: "#C098D2",
          Default: "#C39BD3",
        },
        mmi3: {
          CM: "#90CAB8",
          TD: "#93CDB9",
          TP: "#96D0BA",
          Default: "#99D3BD",
        },
      };

    constructor(id, summary, description, start, end, location , year) {
        this.#id = id;
        this.#summary = summary.slice(0, summary.lastIndexOf(','));
        this.#description = description;
        this.#start = new Date(start);
        this.#end = new Date(end);
        this.#location = location;
        this.#groups = summary.slice(summary.lastIndexOf(',')+1);
        this.#groups = this.#groups.split('.');
        this.#groups = this.#groups.map( gr => gr.replace(/\s/g, "") );
        this.#year = year;
    }


    get id() {
        return this.#id;
    }

    get summary() {
        return this.#summary;
    }

    get description() {
        return this.#description;
    }

    get start() {
        return this.#start;
    }

    get end() {
        return this.#end;
    }

    get location() {
        return this.#location;
    }

    get groups() {
        return this.#groups.map( gr => gr); // retourne une copie du tableau
    }
    get colour() {
        const allColours = {
          TP: this.#calendarColours[this.#year].TP,
          TD: this.#calendarColours[this.#year].TD,
          CM: this.#calendarColours[this.#year].CM,
          Default: this.#calendarColours[this.#year].Default,
        }
    
        for (let individualColor in allColours) {
          if (this.#summary.includes(individualColor)) {
            return allColours[individualColor];
          }
        }
        return allColours.Default;
      };
    // retourne un objet contenant les informations de l'événement
    // dans un format compatible avec Toast UI Calendar (voir https://nhn.github.io/tui.calendar/latest/EventObject)
    toObject() {
        return {
            id: this.#id,
            title: this.#summary,
            body: this.#description,
            start: this.#start,
            end: this.#end,
            location: this.#location, 
            backgroundColor: this.colour,
            borderColor: this.colour,
            groupe: this.#groups
        }
    }
}

export {Event};
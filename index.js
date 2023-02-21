function dataset() {
    return {
        selectedDays: JSON.parse(
            localStorage.getItem("selectedDays") || "[]"
        ),
        level: 1,
        checkboxState: false,
        days: [],
        daysLi: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthLi: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        selectedYear: JSON.parse(
            localStorage.getItem("selectedYear") || "new Date().getFullYear()"
        ),
        invalidDays: 0,
        commits: null,
        undoHistory: [],
        redoHistory: [],

        // Firt day of selected Year
        startDay() {
            return new Date(this.selectedYear + "-01-01").getDay();
        },

        // First day of seleted Year on ISO format
        startDate() {
            return new Date(this.selectedYear + "-01-01")
                .toISOString()
                .slice(0, 10);
        },

        // Last day of selected Year on ISO format
        endDate() {
            return new Date(this.selectedYear + 1 + "-01-01")
                .toISOString()
                .slice(0, 10);
        },

        // Clean All seleted Data 
        refreshData() {
            this.selectedDays = [];
            // addToLocalStorage("selectedDays", this.selectedYear);
            localStorage.setItem("selectedDays", this.selectedDays);
        },

        // Incremet selected year
        incYear() {
            // if selectedYear is higher than 
            if (this.selectedYear >= new Date().getFullYear()) {
                return;
            }

            this.selectedYear = this.selectedYear + 1;
            localStorage.setItem("selectedYear", this.selectedYear);
        },

        // decrement selected year
        decYear() {
            this.selectedYear = this.selectedYear - 1;
            // addToLocalStorage("selectedYear", this.selectedYear);
            localStorage.setItem("selectedYear", this.selectedYear);
        },

        // Add to Local Storage value
        addToLocalStorage(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        // Fetch All data of year
        days() {
            const days = [];

            const startYear = new Date(this.selectedYear + "-01-01");
            const endYear = new Date(this.selectedYear + 1 + "-01-01");

            for (let d = startYear; d < endYear; d.setDate(d.getDate() + 1)) {
                // if this day its higher than now break
                if (d > new Date()) {
                    break;
                }

                const year = d.getFullYear();
                const month = d.getMonth() + 1;
                const day = d.getDate();


                const final = "date(" + year + "," + month + "," + day + ")";
                days.push(final);
            }

            return days;
        },

        invalidDays() {
            const thisYear = new Date().getFullYear();

            // get how much day left we have on selectedYear - thisYear
            const differendDay = Math.floor(
                (new Date(this.selectedYear + 1 + "-01-01") - new Date()) /
                (1000 * 60 * 60 * 24)
            );

            if (this.selectedYear >= thisYear) {
                return differendDay;

            } else {
                return 0;
            }
        },

        years() {
            const years = [];
            for (let y = 2004; y <= new Date().getFullYear(); y++) {
                years.push(y);
            }
            return years;
        },

        addItem(item) {
            this.selectedDays.push(item);
            this.undoHistory.push([...this.selectedDays]);
            this.redoHistory = [];
            addToLocalStorage("selectedDays", this.selectedYear);
        },

        download(filename, text) {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },

        generateDate() {
            let data = '';
            let times = this.commits ? this.commits : 1;

            for (let i = 0; i < times; i++) {
                data += this.selectedDays;

                if (i < times - 1) {
                    data += ',';
                }
            }
            const fileName = 'art.txt';

            this.download(fileName, data);
        },

        undo() {
            if (this.undoHistory.length > 0) {
                const previousState = this.undoHistory.pop();
                this.redoHistory.push([...this.selectedDays]);
                this.selectedDays = previousState;
                addToLocalStorage("selectedDays", this.selectedYear);
            }
        },

        redo() {
            if (this.redoHistory.length > 0) {
                const nextState = this.redoHistory.pop();
                this.undoHistory.push([...this.selectedDays]);
                this.selectedDays = nextState;
                addToLocalStorage("selectedDays", this.selectedYear);
            }
        },
    };
}
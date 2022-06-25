Vue.createApp({

    data() {
        return {
            title: "Vue <strong> Tracker</strong>",
            logoSource: "https://cdn.svgporn.com/logos/vue.svg",
            tasks: [],
            taskID:0,
            taskName: "",
            isTaskInProgress: false,
            startTime: null,
            errorMsg: null,
            tsFormatter: Intl.DateTimeFormat('fr',{hour: '2-digit', minute:'2-digit'} )

        }
    },
    methods: {
        startTask(time) {
            // Vérifications
            if (this.taskName.length == 0){
                this.errorMsg = "Le nom d'une tâche ne peut pas être vide"
                return
            } else if (this.isTaskInProgress){
                this.errorMsg = "Une tâche est déja en cours"
                return
            } else {
                this.errorMsg = null
            }
            // Début de la tâche
            this.isTaskInProgress = true;
            this.startTime = time;
        },

        stopTask() {
            // Vérification
            if(!this.isTaskInProgress) {
                this.errorMsg = "Aucune tâche n'est en cours"
                return
            }

            // Enregistrement de la tâche
            this.tasks.unshift({
                id: this.getAnID(),
                name: this.taskName,
                start: this.startTime,
                end: Date.now(),
            })

            // Fin de la tâche
            this.isTaskInProgress = false
            this.errorMsg = null
            this.taskName=""
        },

        getAnID(){
            this.taskID++
            return this.taskID
        },

        formatTimestamp(ts){  
            return this.tsFormatter.format(ts)
        },

        durationBetweenTimes(start, end){
            let seconds = Math.floor((end / 1000) - ( start / 1000 ))
            let minutes = Math.floor(seconds / 60)
            const hours = Math.floor(minutes / 60)
            seconds = seconds % 60
            minutes = minutes % 60
            return `${String(hours).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }

    }

}).mount('#app');


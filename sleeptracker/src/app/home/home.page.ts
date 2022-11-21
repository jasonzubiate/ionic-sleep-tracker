import { Component } from "@angular/core";
import { SleepService } from "../services/sleep.service";
import { SleepData } from "../data/sleep-data";
import { OvernightSleepData } from "../data/overnight-sleep-data";
import { StanfordSleepinessData } from "../data/stanford-sleepiness-data";
import { TimerComponent } from "../components/timer/timer.component";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	trackerStatus: string = "inactive";
	counter: number;
	timerRef;
	loggedTime;
	startTime;
	elapsedTimeStr = "8 hours 30 minutes";

	constructor(public sleepService: SleepService) {}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	startTracker() {
		this.trackerStatus = "active";
		if (this.trackerStatus == "active") {
			this.startTime = Date.now() - (this.counter || 0);
			this.timerRef = setInterval(() => {
				this.counter = Date.now() - this.startTime;
			});
		} else {
			clearInterval(this.timerRef);
			this.clearTrackerTimer()
		}
	}

	clearTrackerTimer() {
		this.trackerStatus = "inactive";
		this.loggedTime = new OvernightSleepData(this.startTime, this.loggedTime);
	}

	async trackerToggle() {
		this.trackerStatus == "inactive"
			? this.startTracker()
			: this.clearTrackerTimer();
	}
}

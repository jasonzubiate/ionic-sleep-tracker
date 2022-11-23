import { Component } from "@angular/core";
import { formatDate } from "@angular/common";
import { SleepService } from "../services/sleep.service";
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
	endTime;
	startTime;
	loggedTime
	startTimeStr = "8 hours 30 minutes";

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
		this.startTimeStr = formatDate(Date.now(), "mediumTime", "en-US") ;
		this.startTime = Date.now();
	}

	clearTrackerTimer() {
		this.trackerStatus = "inactive";
		this.endTime = Date.now();
		this.loggedTime = new OvernightSleepData(this.startTime, this.endTime);
	}

	async trackerToggle() {
		this.trackerStatus == "inactive"
			? this.startTracker()
			: this.clearTrackerTimer();
	}
}

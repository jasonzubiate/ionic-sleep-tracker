import { Component, NgModule } from "@angular/core";
import { formatDate } from "@angular/common";
import { SleepService } from "../services/sleep.service";
import { OvernightSleepData } from "../data/overnight-sleep-data";


@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	trackerStatus: string = "inactive";
	displaySleepLog = false;
	startTime;
	endTime;
	loggedTimes = [];
	startTimeStr;

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
		this.startTime = new Date();
		this.startTimeStr = formatDate(Date.now(), "shortTime", "en-US") ;
	}

	clearTrackerTimer() {
		this.trackerStatus = "inactive";
		this.endTime = new Date;
		this.loggedTimes.push(new OvernightSleepData(this.startTime, this.endTime));
	}

	async trackerToggle() {
		this.trackerStatus == "inactive"
			? this.startTracker()
			: this.clearTrackerTimer();
	}
}

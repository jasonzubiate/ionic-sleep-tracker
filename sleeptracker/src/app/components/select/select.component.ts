import { Component, OnInit } from "@angular/core";
import { SleepService } from "src/app/services/sleep.service";
import { StanfordSleepinessData } from "../../data/stanford-sleepiness-data";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements OnInit {
  displaySleepinessLog = false
	value: number;
	loggedRatings = [];

	constructor(public sleepService: SleepService) {}

	ngOnInit() {}

	storeValue() {
		console.log(this.value);
		this.loggedRatings.push(new StanfordSleepinessData(this.value));
	}

	getLoggedRatings() {
		console.log(this.loggedRatings) ;
	}
}

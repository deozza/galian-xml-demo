import { Component} from '@angular/core';
import { GLI } from "./Entities/GLI";
import { Document } from "./Entities/document";
import * as o2x from "object-to-xml";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

	creating:boolean = false;
	gli:GLI = new GLI;
	newDocument:Document;
	serialized:string = "";
	days: number[] = [];
	months: number[]= [];
	years: number[]= [];

	constructor()
	{
		for(var i = 1; i <=31; i++)
		{
			this.days.push(i);
		}

		for(var i = 1; i <=12; i++)
		{
			this.months.push(i);
		}

		const date:Date = new Date();
		for(var i = 0; i <=100; i++)
		{
			this.years.push(date.getUTCFullYear()-i);
		}
	}

	addFile()
	{
		this.newDocument = new Document(this.gli);
		this.gli.documents.push(this.newDocument);
	}

	removeFile(index:number)
	{
		this.gli.documents.splice(index,1);
	}

	xmlSerialize()
	{
		let formated = this.gli.format();
		console.log(formated);

		this.serialized = o2x(formated);
		console.log(this.serialized);
	}

	fileEvent(fileName:string, i:number)
	{
		this.gli.documents[i].fileName = fileName;
	}
}

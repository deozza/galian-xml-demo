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
	days: string[] = [];
	months: string[]= [];
	years: number[]= [];

	constructor()
	{
		for(var i = 1; i <=31; i++)
		{
			let value:string = JSON.stringify(i);
			if(i < 10)
			{
				value = "0"+value;
			}
			this.days.push(value);
		}

		for(var i = 1; i <=12; i++)
		{
			let value:string = JSON.stringify(i);
			if(i < 10)
			{
				value = "0"+value;
			}
			this.months.push(value);
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

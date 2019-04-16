import { Document } from "./document";

export class GLI {
	dateNum:Date;
	dayRecep:number;
	monthRecep:number;
	yearRecep:number;
	typeLot:string;
	canal:string = "EVERYCHECK";
	documents:Array<Document>;
	idClient:string;
	title:string;
	alphabet:string = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	base:number = this.alphabet.length;
	alphabetLookup:any;



	constructor()
	{
		this.dateNum = new Date();
		this.dayRecep = null;
		this.monthRecep = null;
		this.yearRecep = null;
		this.typeLot = "AGREMENT_GLI";
		this.canal = "EVERYCHECK";
		this.documents = [];
		this.idClient = "";
		this.title = "";

		this.alphabetLookup = this.alphabet.split("").reduce(function(lookup, char, index) {
			lookup[char] = index;
			return lookup;
		}, {});

	}

	format(): Object
	{
		let DOCUMENT:Array<Object> = [];
		let realMonth:string = JSON.stringify(this.dateNum.getMonth() + 1);
		let realDay:string = JSON.stringify(this.dateNum.getDate());

		let idLot = this.generateIdLot();
		
		if(this.dateNum.getMonth() + 1 < 10)
		{
			realMonth = "0"+realMonth;
		}

		if(this.dateNum.getDate() < 10)
		{
			realDay = "0"+realDay;
		}

		for(let document of this.documents)
		{
			let formatedDocument:Object = 
			{
				'#':
				{
					ID_CLIENT: this.idClient,
					LIB_DOSSIER_SPE: "AGR_"+ this.dateNum.getFullYear() + realMonth + realDay + "_" + idLot,
					NAT_DOC: document.natureDocument,
					DATE_DOC: this.dateNum.getDate() +"/"+ realMonth +"/"+ this.dateNum.getFullYear(),
					NAME_FILE: document.fileName,
					SERVICE: document.service,
					TITLE: this.title
				}
			};

			DOCUMENT.push(formatedDocument);
		}

		let formatedGli:Object = 
		{
			'LOT xmlns:xs="http://www.w3.org/2001/XMLSchema"' :
			{
				DATA_LOT:
				{
					'#': 
					{
						DATE_NUM: this.dateNum.getDate() + "/" + realMonth + "/" + this.dateNum.getFullYear(),
						DAT_RECEP: this.dayRecep + "/" + this.monthRecep + "/" + this.yearRecep,
						TYPE_LOT: this.typeLot,
						ID_LOT: "EVCK" + this.dateNum.getFullYear() + realMonth + realDay + "_" + idLot,
						CANAL: this.canal
					}
				},
				DOCUMENTS:
				{
					'#':
					{
						DOCUMENT
					}
				}
			}	
		};

		return formatedGli;
	}	

	generateIdLot(): string
	{
			let dt = new Date();
			let num = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
			
			let str = "";
			let modulus;

			while (num >= this.base) {
				modulus = num % this.base;
				str = this.alphabet[modulus] + str;
				num = Math.floor(num / this.base);
			}

			let numAgrement = this.alphabet[num] + str;

			while(numAgrement.length < 3)
			{
				numAgrement = "0" + numAgrement;
			}
			return numAgrement;
	}

}

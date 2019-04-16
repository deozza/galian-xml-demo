import { Document } from "./document";

export class GLI {
	dateNum:Date;
	dayRecep:number;
	monthRecep:number;
	yearRecep:number;

	typeLot:string;
	idLot:string;
	canal:string = "EVERYCHECK";
	documents:Array<Document>;

	constructor()
	{
		this.dateNum = new Date();
		this.dayRecep = null;
		this.monthRecep = null;
		this.yearRecep = null;
		this.typeLot = "AGREMENT_GLI";
		this.idLot = "EVCK";
		this.canal = "EVERYCHECK";
		this.documents = [];
	}

	format(): Object
	{
		let DOCUMENT:Array<Object> = [];
		let realMonth:string = JSON.stringify(this.dateNum.getMonth() + 1);

		for(let document of this.documents)
		{
			let formatedDocument:Object = 
			{
				'#':
				{
					ID_CLIENT: document.idClient,
					LIB_DOSSIER_SPE: "AGR"+this.dateNum.getDate() + realMonth + this.dateNum.getFullYear() + document.libDossierSpe,
					NAT_DOC: document.natureDocument,
					DATE_DOC: this.dateNum.getDate() +"/"+ realMonth +"/"+ this.dateNum.getFullYear(),
					NAME_FILE: document.fileName,
					SERVICE: document.service,
					TITLE: document.title
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
						ID_LOT: this.idLot + this.dateNum.getTime(),
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

}

export class Document {

	typeDossierSpe:string;
	natureDocument:string;
	dateDocument:Date;
	fileName:string;
	service:string;

	constructor(values:Object = {})
	{
		this.typeDossierSpe = "AGREMENT";
		this.natureDocument = null;
		this.dateDocument = values['dateNum'];
		this.fileName = null;
		this.service = "DGI";
	}
}
export class Document {

	idClient:string;
	libDossierSpe:string;
	typeDossierSpe:string;
	natureDocument:string;
	dateDocument:Date;
	fileName:string;
	service:string;
	title:string;
	file:Blob;

	constructor(values:Object = {})
	{
		this.idClient = null;
		this.libDossierSpe = null;
		this.typeDossierSpe = "AGREMENT";
		this.natureDocument = null;
		this.dateDocument = values['dateNum'];
		this.fileName = null;
		this.service = "DGI";
		this.title = null;
		this.file = null;
	}
}
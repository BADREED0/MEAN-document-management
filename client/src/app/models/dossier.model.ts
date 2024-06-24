import { Document } from "./document.model";

export class Dossier {
    nom : string;
    proprietaire : string;
    documents : Document[];

    constructor(nom : string, prop : string, docs : Document[] = []){
        this.nom = nom;
        this.proprietaire = prop;
        this.documents = docs;
    }
    

    toMongoose(){
        return {
            name: this.nom,
            proprietaire: this.proprietaire,
            documents: this.documents
        }
    }
}
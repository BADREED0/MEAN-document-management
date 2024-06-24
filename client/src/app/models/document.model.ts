import { Chemin } from "./chemin.model";

const TYPE_DOC = {
    text : "text",
    doc : "document",
    ppt : "powerpoint", 
    image : "image", 
    sound : "sound",
    video : "video", 
    other : "other"
}

export class Document{
    chemin : Chemin;
    taille : number;
    identifiant : string;
    type : string;

    constructor(chemin : Chemin, taille : number, identifiant : string){
        this.taille = taille;
        this.identifiant = identifiant;
        this.chemin = chemin;

        switch(this.chemin.extension){
            case 'txt':
                this.type = TYPE_DOC.text;
                break;
            case 'doc':
                this.type = TYPE_DOC.doc;
                break;
            case 'ppt':
                this.type = TYPE_DOC.ppt;
                break;
            case 'jpg':
                this.type = TYPE_DOC.image;
                break;
            case 'mp3':
                this.type = TYPE_DOC.sound;
                break;
            case 'mp4':
                this.type = TYPE_DOC.video;
                break;
            default:
                this.type = TYPE_DOC.other;
            
        }
    }

    toMongooseDocument() {
        return {
            emplacement: this.chemin.emplacement,
            name: this.chemin.identificateur,
            extension: this.chemin.extension,
            type: this.type,
            taille: this.taille,
            proprietaire: this.identifiant
        };
    }

}
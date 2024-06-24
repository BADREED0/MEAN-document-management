export class Chemin{
    emplacement : string;
    identificateur : string;
    extension : string;
    
    constructor(emplacement : string , identificateur : string , extension : string){
        this.emplacement = emplacement;
        this.identificateur = identificateur;
        this.extension = extension;
    }

    getCheminComplet(){
        return this.emplacement + "/" + this.identificateur + "." + this.extension;
    }
}
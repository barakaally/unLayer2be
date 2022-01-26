import { BeefreeDesign } from "../model/beefree.model";
import { UnlayerEmailJson } from "./UnlayerEmailJson";

export class Unlayer2be {

    static from=(data:string)=>new UnlayerEmailJson().fromString(data);
    
    static fromDesign=(data: BeefreeDesign)=>new UnlayerEmailJson().fromDesign(data);
}
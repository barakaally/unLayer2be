import { BeefreeDesign } from "../model/beefree.model";
import { UnlayerEmailJson } from "./UnlayerEmailJson";

export class Unlayer2be {

    static from(data: BeefreeDesign | string) {
        
        if (typeof data === 'string')
            return new UnlayerEmailJson().fromString(data);

        return new UnlayerEmailJson().fromObject(data);
    }
}
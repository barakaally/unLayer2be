import { BeefreeDesign } from "../model/beefree.model";
import { UnlayerEmailJson } from "./UnlayerEmailJson";

export class Unlayer2be {
    /**
     * @description get unlayer design from beefree url encoded design json
     * @param data string @description Beefree url encoded design Json
     * @returns UnlayerDesin @description Unlayer design Json
     */
    static from = (data: string) => new UnlayerEmailJson().fromString(data);
    /**
     * @description get unlayer design from beefree design json
     * @param data BeefreeDesign  @description Beefree design Json
     * @returns UnlayerDesign @description Unlayer design Json
     */
    static design = (data: BeefreeDesign) => new UnlayerEmailJson().fromDesign(data);
}
import { Unlayerhtml } from "./UnlayerHtml";
import { BeeDesign } from "../model/bee.model";
import { UnlayerEmailJson } from "./UnlayerEmailJson";

export class Unlayer2be {
    /**
     * @description get unlayer design from bee url encoded design json
     * @param data string @description Bee url encoded design Json
     * @returns UnlayerDesin @description Unlayer design Json
     */
    static from = (data: string) => new UnlayerEmailJson().fromString(data);
    /**
     * @description get unlayer design from bee design json
     * @param data BeeDesign  @description Bee design Json
     * @returns UnlayerDesign @description Unlayer design Json
     */
    static design = (data: BeeDesign) => new UnlayerEmailJson().fromDesign(data);

    static fromHtml = (data: string) => new Unlayerhtml().from(data);
}
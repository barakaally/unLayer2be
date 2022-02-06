import { Bee2Unlayer } from "../design/bee2Unlayer";
import { Html2Unlayer } from "../design/html2Unlayer";
import { BeeDesign } from "../model/bee.model";

export class Unlayer2be {
    /**
     * @description get unlayer design from bee url encoded design json
     * @param data string @description Bee url encoded design Json
     * @returns UnlayerDesin @description Unlayer design Json
     */
    static from = (data: string) => new Bee2Unlayer().fromString(data);
    /**
     * @description get unlayer design from bee design json
     * @param data BeeDesign  @description Bee design Json
     * @returns UnlayerDesign @description Unlayer design Json
     */
    static design = (data: BeeDesign) => new Bee2Unlayer().fromDesign(data);
    /**
     * @description get unlayer design from html 
     * @param data HTML  @description Bee design Json
     * @returns UnlayerDesign @description Unlayer design Json
     */
    static fromHtml = (data: string) => new Html2Unlayer().from(data);
}
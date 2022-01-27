import { BeeDesign } from "../src/model/bee.model";
import { UnlayerDesign } from '../src/model/unlayer.model'

export declare class Unlayer2be {
    /**
     * @description get unlayer design from bee url encoded design json
     * @param data string @description Bee encoded string
     * @returns UnlayerDesin @description Unlayer design Json
     */
    static from(data: string): UnlayerDesign
    /**
    * @description get unlayer design from bee design json
    * @param data BeeDesign  @description Bee design Json
    * @returns UnlayerDesign @description Unlayer design Json
    */
    static design(data: BeeDesign): UnlayerDesign
}
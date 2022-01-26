import { BeefreeDesign } from "../src/model/beefree.model";
import { UnlayerDesign } from '../src/model/unlayer.model'

export declare class Unlayer2be {
    /**
     * @description get unlayer design from beefree url encoded design json
     * @param data string @description Beefree url encoded design Json
     * @returns UnlayerDesin @description Unlayer design Json
     */
    static from(data: string): UnlayerDesign
    /**
    * @description get unlayer design from beefree design json
    * @param data BeefreeDesign  @description Beefree design Json
    * @returns UnlayerDesign @description Unlayer design Json
    */
    static design(data: BeefreeDesign): UnlayerDesign
}
import { BeefreeDesign } from "../src/model/beefree.model";
import { UnlayerDesign } from '../src/model/unlayer.model'

export declare class Unlayer2be {
    static from(data: string): UnlayerDesign
    static fromDesign(data: BeefreeDesign): UnlayerDesign
}
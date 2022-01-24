import { BeefreeDesign } from "../model/beefree.model";
import { Beefree2Unplayer } from "./beefree2Unplayer";

export  class Bee2UnlayerEmailJson{

    static from(data:BeefreeDesign|string) {
        return Beefree2Unplayer(data);
    }
}
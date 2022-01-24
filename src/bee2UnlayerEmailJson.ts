import { Beefree2Unplayer } from "../lib/beefree2Unplayer";
import { BeefreeDesign } from "../model/beefree.model";

export  class Bee2UnlayerEmailJson{

    static from(data:BeefreeDesign) {
        return Beefree2Unplayer(data);
    }
}
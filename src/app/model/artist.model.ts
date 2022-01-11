import { Song } from "../features/song/entities/song.entity";
import { Album } from "./album.model";
import { Artwork } from "./artwork.model";

export class Artist {

    public id: string;
    public geniusUrl: string;
    public description: string;
    public name: string;
    public registeredAt: Date;

    public songs?: Song[];
    public albums?: Album[];
    public banner?: Artwork;
    public artwork?: Artwork;

}
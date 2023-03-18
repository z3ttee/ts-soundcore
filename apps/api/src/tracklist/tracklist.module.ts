import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectionModule } from "../collection/collection.module";
import { PlaylistItem } from "../playlist/entities/playlist-item.entity";
import { Song } from "../song/entities/song.entity";
import { SongModule } from "../song/song.module";
import { TracklistV2Controller } from "./controllers/tracklist-v2.controller";
import { TracklistController } from "./controllers/tracklist.controller";
import { TracklistService } from "./services/tracklist.service";

@Module({
    controllers: [
        TracklistController,
        TracklistV2Controller
    ],
    providers: [
        TracklistService
    ],
    imports: [
        SongModule,
        CollectionModule,
        TypeOrmModule.forFeature([ PlaylistItem, Song ])
    ],
    exports: [
        TracklistService
    ]
})
export class TracklistModule {}
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { RouterModule, Routes } from "@angular/router";
import { bell, HeroIconModule } from "ng-heroicon";
import { SCNGXLabelModule, SCNGXScreenModule, SCNGXToolbarModule, SCNGXTooltipModule } from "soundcore-ngx";
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    { path: "", component: HomeComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SCNGXScreenModule,
        SCNGXTooltipModule,
        SCNGXToolbarModule,

        HeroIconModule.withIcons({ bell }),
        MatRippleModule,

        SCNGXLabelModule
    ],
    declarations: [
      HomeComponent
    ]
})
export class HomeModule {}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DolarComponent } from './dolar/dolar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { BitcoinComponent } from './bitcoin/bitcoin.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { OroComponent } from './oro/oro.component';
import { NaftaComponent } from './nafta/nafta.component';
import { BigmacComponent } from './bigmac/bigmac.component';
import { MinimosubeComponent } from './minimosube/minimosube.component';
import { PrensadoComponent } from './prensado/prensado.component';
import { InflacionanualComponent } from './inflacionanual/inflacionanual.component';
import { DatePipe } from '@angular/common';
import { DolarblueComponent } from './dolarblue/dolarblue.component';
import { AsadoComponent } from './asado/asado.component';
import { PanComponent } from './pan/pan.component';
import { TasabcraComponent } from './tasabcra/tasabcra.component';
import { RiesgopaisComponent } from './riesgopais/riesgopais.component';
import { IndiceBcraComponent } from './indice-bcra/indice-bcra.component';
import { DolarTileComponent } from './dolar-tile/dolar-tile.component';
import { MoonComponent } from './moon/moon.component';
import { FeriadoComponent } from './feriado/feriado.component';
import { EstacionComponent } from './estacion/estacion.component';

@NgModule({
  declarations: [
    AppComponent,
    DolarComponent,
    BitcoinComponent,
    TemperatureComponent,
    OroComponent,
    NaftaComponent,
    BigmacComponent,
    MinimosubeComponent,
    PrensadoComponent,
    InflacionanualComponent,
    DolarblueComponent,
    AsadoComponent,
    PanComponent,
    TasabcraComponent,
    RiesgopaisComponent,
    IndiceBcraComponent,
    DolarTileComponent,
    MoonComponent,
    FeriadoComponent,
    EstacionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

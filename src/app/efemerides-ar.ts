/**
 * Efemérides argentinas (calendario civil MM-DD, incl. 29/02).
 * Fuente base: Portal:Argentina/Efemérides (Wikipedia) + curaduría local.
 * Una entrada por día; wikiUrl opcional → es.wikipedia.org.
 */

export interface Efemeride {
  /** Año del hecho (si aplica). */
  year?: string;
  /** Texto corto para el hero. */
  text: string;
  /** Artículo en Wikipedia (es), si hay página sólida. */
  wikiUrl?: string;
}

/** Clave: MM-DD (hora Argentina). */
const EFEMERIDES: Readonly<Record<string, Efemeride>> = {
  '01-01': {
    year: '1871',
    text: 'Entra en vigencia el Código Civil Argentino',
    wikiUrl: 'https://es.wikipedia.org/wiki/C%C3%B3digo_Civil_de_la_Rep%C3%BAblica_Argentina'
  },
  '01-02': {
    year: '1890',
    text: 'El jurisconsulto, legislador y escritor Joaquín Víctor González funda la Universidad Nacional…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Joaqu%C3%ADn_V%C3%ADctor_Gonz%C3%A1lez'
  },
  '01-03': {
    year: '1833',
    text: 'Ocupación británica de las Islas Malvinas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Islas_Malvinas'
  },
  '01-04': {
    year: '1831',
    text: 'Las provincias de Buenos Aires, Santa Fe y Entre Ríos firman el Pacto Federal',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pacto_Federal'
  },
  '01-05': {
    year: '1939',
    text: 'Muere por su propia mano el abogado y político rosarino Lisandro de la Torre',
    wikiUrl: 'https://es.wikipedia.org/wiki/Lisandro_de_la_Torre'
  },
  '01-06': {
    year: '1876',
    text: 'Paraguay y Argentina firman el tratado de límites por el cual este país retiene el territorio…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Provincia_de_Misiones'
  },
  '01-07': {
    year: '1919',
    text: 'La situación de los obreros de los talleres Vasena se agrava, dando inicio a la Semana Trágica',
    wikiUrl: 'https://es.wikipedia.org/wiki/Semana_Tr%C3%A1gica_(Argentina)'
  },
  '01-08': {
    year: '1766',
    text: 'Una expedición británica capitaneada por el marino John McBride instala una guarnición y…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Tratado_de_Utrecht'
  },
  '01-09': {
    year: '1954',
    text: 'Muere la ensayista y feminista bonaerense Herminia Brumana',
    wikiUrl: 'https://es.wikipedia.org/wiki/Herminia_Brumana'
  },
  '01-10': {
    year: '1829',
    text: 'Muere el periodista, político y ensayista Gregorio Funes, conocido como "el Deán Funes"',
    wikiUrl: 'https://es.wikipedia.org/wiki/Gregorio_Funes'
  },
  '01-11': {
    year: '1884',
    text: 'en La Plata se inaugura un servicio de iluminación pública eléctrica',
    wikiUrl: 'https://es.wikipedia.org/wiki/La_Plata'
  },
  '01-12': {
    year: '1899',
    text: 'La Fragata Presidente Sarmiento emprende por primera vez un viaje de circunnavegación del globo',
    wikiUrl: 'https://es.wikipedia.org/wiki/ARA_Presidente_Sarmiento'
  },
  '01-13': {
    year: '1825',
    text: 'El Alto Perú proclama en Cochabamba su independencia de España con el nombre de República de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Provincias_Unidas_del_R%C3%ADo_de_la_Plata'
  },
  '01-14': {
    year: '1977',
    text: 'Muere el grabador catalano-argentino Pompeyo Audivert',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pompeyo_Audivert'
  },
  '01-15': {
    year: '1944',
    text: 'Terremoto de San Juan',
    wikiUrl: 'https://es.wikipedia.org/wiki/Terremoto_de_San_Juan_de_1944'
  },
  '01-16': {
    year: '1955',
    text: 'El piloto Juan Manuel Fangio gana por segunda vez consecutiva el Gran Premio de Buenos Aires de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_Fangio'
  },
  '01-17': {
    year: '1855',
    text: 'El político Pastor Obligado reanuda la gobernación de la provincia de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pastor_Obligado'
  },
  '01-18': {
    year: '1878',
    text: 'Argentina y Chile firman el Tratado Fierro-Sarratea',
    wikiUrl: 'https://es.wikipedia.org/wiki/Tratado_Fierro-Sarratea'
  },
  '01-19': {
    year: '1906',
    text: 'Muere el político, militar, historiador y periodista Bartolomé Mitre',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bartolom%C3%A9_Mitre'
  },
  '01-20': {
    year: '1868',
    text: 'Fallece en San Miguel de Tucumán el guerrero de la independencia Cnel Lorenzo Lugones',
    wikiUrl: 'https://es.wikipedia.org/wiki/Lorenzo_Lugones'
  },
  '01-21': {
    year: '1980',
    text: 'Junto con el cántabro Gerardo Diego, Jorge Luis Borges recibe el Premio Cervantes',
    wikiUrl: 'https://es.wikipedia.org/wiki/Gerardo_Diego'
  },
  '01-22': {
    year: '1930',
    text: 'El crucero Monte Cervantes, que unía Buenos Aires con Ushuaia',
    wikiUrl: 'https://es.wikipedia.org/wiki/Monte_Cervantes'
  },
  '01-23': {
    year: '1950',
    text: 'Nacimiento de Luis Alberto Spinetta · Día Nacional del Músico',
    wikiUrl: 'https://es.wikipedia.org/wiki/Luis_Alberto_Spinetta'
  },
  '01-24': {
    year: '1967',
    text: 'Muere el poeta surrealista porteño Oliverio Girondo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Oliverio_Girondo'
  },
  '01-25': {
    year: '1997',
    text: 'Asesinato de José Luis Cabezas · Día del Reportero Gráfico',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Luis_Cabezas'
  },
  '01-26': {
    year: '1914',
    text: 'Muere el "cura gaucho" cordobés, José Gabriel Brochero',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Gabriel_Brochero'
  },
  '01-27': {
    year: '1960',
    text: 'El exiliado Juan Domingo Perón abandona República Dominicana para acogerse a la bienvenida que…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Domingo_Per%C3%B3n'
  },
  '01-28': {
    year: '1977',
    text: 'Muere el pintor impresionista porteño Benito Quinquela Martín',
    wikiUrl: 'https://es.wikipedia.org/wiki/Benito_Quinquela_Mart%C3%ADn'
  },
  '01-29': {
    year: '1879',
    text: 'Se inaugura la Casa de Correos de Buenos Aires'
  },
  '01-30': {
    year: '1794',
    text: 'Una Real Cédula crea el Consulado de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Real_C%C3%A9dula'
  },
  '01-31': {
    year: '1813',
    text: 'Comienza a sesionar la Asamblea del Año XIII',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo'
  },
  '02-01': {
    year: '1886',
    text: 'Se inaugura el ferrocarril a Rosario, que más tarde pasaría a formar parte del Ferrocarril…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ferrocarril_General_Manuel_Belgrano'
  },
  '02-02': {
    year: '1890',
    text: 'Muere en París el higienista y legislador Guillermo Rawson',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guillermo_Rawson'
  },
  '02-03': {
    year: '1813',
    text: 'Batalla de San Lorenzo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_San_Lorenzo'
  },
  '02-04': {
    year: '1817',
    text: 'Las tropas del ya general José de San Martín derrotan a los realistas en la batalla de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Achupallas'
  },
  '02-05': {
    year: '1979',
    text: 'Se instala la base antártica Belgrano II',
    wikiUrl: 'https://es.wikipedia.org/wiki/Base_Belgrano_II'
  },
  '02-06': {
    year: '1866',
    text: 'Fallece el general Argentino Juan Gregorio de las Heras',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_de_Independencia_Hispanoamericana'
  },
  '02-07': {
    year: '1917',
    text: 'Se funda el club Gimnasia y Esgrima de Concepción del Uruguay, de la provincia de Entre Ríos',
    wikiUrl: 'https://es.wikipedia.org/wiki/Gimnasia_y_Esgrima_de_Concepci%C3%B3n_del_Uruguay'
  },
  '02-08': {
    year: '1827',
    text: 'Batalla de Juncal entre argentinos y brasileños',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Juncal'
  },
  '02-09': {
    year: '1826',
    text: 'Argentina derrota a Brasil en la Batalla de los Corales',
    wikiUrl: 'https://es.wikipedia.org/wiki/Argentina'
  },
  '02-10': {
    year: '1912',
    text: 'Sanción de la Ley Sáenz Peña',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ley_S%C3%A1enz_Pe%C3%B1a'
  },
  '02-11': {
    year: '1859',
    text: 'Fallece en San Miguel de Tucumán el obispo José Eusebio Colombres',
    wikiUrl: 'https://es.wikipedia.org/wiki/San_Miguel_de_Tucum%C3%A1n'
  },
  '02-12': {
    year: '1817',
    text: 'El Ejército de los Andes, bajo el mando de José de San Martín libra la batalla de Chacabuco en…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Chacabuco'
  },
  '02-13': {
    year: '1837',
    text: 'Juan Manuel de Rosas rompe relaciones con el gobierno de la Confederación Perú-Boliviana…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_entre_la_Confederaci%C3%B3n_Per%C3%BA-Boliviana_y_Chile'
  },
  '02-14': {
    year: '1817',
    text: 'Vencedor dos días antes en la batalla de Chacabuco',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Chacabuco'
  },
  '02-15': {
    year: '1811',
    text: 'Nacimiento de Domingo Faustino Sarmiento',
    wikiUrl: 'https://es.wikipedia.org/wiki/Domingo_Faustino_Sarmiento'
  },
  '02-16': {
    year: '1595',
    text: 'Se funda por tercera vez Buenos Aires, por obra de Fernando de Zárate',
    wikiUrl: 'https://es.wikipedia.org/wiki/Fernando_de_Z%C3%A1rate_(gobernador)'
  },
  '02-17': {
    year: '1971',
    text: 'Fallece la pedagoga paranaense Luz Vieira Méndez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Luz_Vieira_M%C3%A9ndez'
  },
  '02-18': {
    year: '1889',
    text: 'Se funda el Colegio de Escribanos de la Provincia de Buenos Aires'
  },
  '02-19': {
    year: '1892',
    text: 'Por iniciativa de Carlos Thays, se funda el Jardín Botánico de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Carlos_Thays'
  },
  '02-20': {
    year: '1813',
    text: 'La batalla de Salta, librada entre el Ejército del Norte al mando del general Manuel Belgrano y…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Salta'
  },
  '02-21': {
    year: '1893',
    text: 'Alejandro Watson Hutton funda en Buenos Aires el primer antecedente de la actual Asociación del…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Alejandro_Watson_Hutton'
  },
  '02-22': {
    year: '1904',
    text: 'Se finaliza el asentamiento del observatorio científico de la isla Laurie',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Ant%C3%A1rtida_Argentina'
  },
  '02-23': {
    year: '1820',
    text: 'Las provincias de Buenos Aires, Santa Fe y Entre Ríos suscriben el Tratado del Pilar',
    wikiUrl: 'https://es.wikipedia.org/wiki/Tratado_del_Pilar'
  },
  '02-24': {
    year: '1946',
    text: 'Juan Domingo Perón accede a su primer mandato presidencial al ganar las elecciones con el 52%…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Domingo_Per%C3%B3n'
  },
  '02-25': {
    year: '1878',
    text: 'Fallece el escritor, jurista y político Juan María Gutiérrez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Mar%C3%ADa_Guti%C3%A9rrez'
  },
  '02-26': {
    year: '1951',
    text: 'Fallece el pintor porteño Fortunato Lacámera, oriundo del barrio de La Boca',
    wikiUrl: 'https://es.wikipedia.org/wiki/Fortunato_Lac%C3%A1mera'
  },
  '02-27': {
    year: '1812',
    text: 'Belgrano crea la Bandera Argentina en Rosario',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bandera_de_Argentina'
  },
  '02-28': {
    year: '1811',
    text: 'Con el llamado Grito de Asencio, los revolucionarios de la Banda Oriental encabezados por Pedro…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Grito_de_Asencio'
  },
  '02-29': {
    year: '1944',
    text: 'Ascenso de Alberto Teisaire en el GOU',
    wikiUrl: 'https://es.wikipedia.org/wiki/Grupo_de_Oficiales_Unidos'
  },
  '03-01': {
    year: '1802',
    text: 'Bajo la dirección de Cosme Argerich, se inaugura en Buenos Aires la Escuela de Medicina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Cosme_Argerich'
  },
  '03-02': {
    year: '1561',
    text: 'El capitán español Pedro del Castillo funda la ciudad de Mendoza',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pedro_del_Castillo'
  },
  '03-03': {
    year: '1910',
    text: 'Se inaugura la línea férrea entre Chile y Argentina, atravesando la cordillera de los Andes',
    wikiUrl: 'https://es.wikipedia.org/wiki/Cordillera_de_los_Andes'
  },
  '03-04': {
    year: '1811',
    text: 'Fallece a bordo de la fragata Fama el político y escritor porteño Mariano Moreno',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mariano_Moreno'
  },
  '03-05': {
    year: '1845',
    text: 'Fallece el militar y político porteño Martín Rodríguez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mart%C3%ADn_Rodr%C3%ADguez'
  },
  '03-06': {
    year: '1894',
    text: 'El Presidente Julio Argentino Roca decreta la libertad del dirigente opositor Leandro N. Alem',
    wikiUrl: 'https://es.wikipedia.org/wiki/Julio_Argentino_Roca'
  },
  '03-07': {
    year: '1906',
    text: 'Nace el neurocirujano y sanitarista santiagueño Ramón Carrillo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_Libertadora_(Argentina)'
  },
  '03-08': {
    year: '1954',
    text: 'Se inaugura la primera edición del Festival Cinematográfico de Mar del Plata',
    wikiUrl: 'https://es.wikipedia.org/wiki/Festival_Internacional_de_Cine_de_Mar_del_Plata'
  },
  '03-09': {
    year: '1811',
    text: 'El Tambor de Tacuarí · Pedro Ríos',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pedro_R%C3%ADos'
  },
  '03-10': {
    year: '1918',
    text: 'Se inaugura, organizado por el Automóvil Club Argentino, el primer Salón del Automóvil',
    wikiUrl: 'https://es.wikipedia.org/wiki/Autom%C3%B3vil_Club_Argentino'
  },
  '03-11': {
    year: '1973',
    text: 'Héctor Cámpora, candidato del Frejuli, recupera el poder para el peronismo tras 17 años de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/H%C3%A9ctor_C%C3%A1mpora'
  },
  '03-12': {
    year: '1893',
    text: 'Se funda, a iniciativa del compositor Emilio Durán, el Conservatorio de Música de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Emilio_Dur%C3%A1n'
  },
  '03-13': {
    year: '1904',
    text: 'Se inaugura la estatua del Cristo Redentor',
    wikiUrl: 'https://es.wikipedia.org/wiki/Cristo_Redentor_de_los_Andes'
  },
  '03-14': {
    year: '1877',
    text: 'Fallece en su granja de Southhampton el exiliado político y militar porteño Juan Manuel de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_de_Rosas'
  },
  '03-15': {
    year: '1961',
    text: 'Inauguración de la base Matienzo, sobre el nunatak Larsen, en la Antártida Argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Base_Matienzo'
  },
  '03-16': {
    year: '1976',
    text: 'En un marco de extrema tensión política, el dirigente radical Ricardo Balbín afirma el…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ricardo_Balb%C3%ADn'
  },
  '03-17': {
    year: '1554',
    text: 'La corriente colonizadora proveniente del noroeste funda la ciudad argentina de Santiago del…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Santiago_del_Estero_(capital)'
  },
  '03-18': {
    year: '1977',
    text: 'Se funda la base Corbeta Uruguay en la isla Morrell, en las islas Sandwich del Sur',
    wikiUrl: 'https://es.wikipedia.org/wiki/Base_Corbeta_Uruguay'
  },
  '03-19': {
    year: '1851',
    text: 'Nace el político y diplomático porteño Roque Sáenz Peña',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_del_Pac%C3%ADfico'
  },
  '03-20': {
    year: '1861',
    text: 'Un terremoto devasta la casi totalidad de la ciudad de Mendoza ocasionando miles de víctimas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mendoza_(Argentina)'
  },
  '03-21': {
    year: '1951',
    text: 'Se inaugura la base San Martín en el islote Barry',
    wikiUrl: 'https://es.wikipedia.org/wiki/Base_San_Mart%C3%ADn'
  },
  '03-22': {
    year: '1778',
    text: 'Una real orden de la corona de España decreta la fundación de una Universidad en Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Monarqu%C3%ADa_Hisp%C3%A1nica'
  },
  '03-23': {
    year: '1984',
    text: 'Cien días después de la asunción de Raúl Ricardo Alfonsín y en vísperas del aniversario del…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ra%C3%BAl_Alfons%C3%ADn'
  },
  '03-24': {
    year: '1976',
    text: 'Día Nacional de la Memoria por la Verdad y la Justicia',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_Nacional_de_la_Memoria_por_la_Verdad_y_la_Justicia'
  },
  '03-25': {
    year: '1903',
    text: 'Se funda el club argentino de fútbol Racing Club',
    wikiUrl: 'https://es.wikipedia.org/wiki/Racing_Club'
  },
  '03-26': {
    year: '1871',
    text: 'Fallece el político y jurista porteño José Roque Pérez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Roque_P%C3%A9rez'
  },
  '03-27': {
    year: '1945',
    text: 'Durante la presidencia de Edelmiro Julián Farrell la Argentina les declara la guerra a Alemania…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Segunda_Guerra_Mundial'
  },
  '03-28': {
    year: '1838',
    text: 'Una escuadra francesa bloquea el puerto de Buenos Aires para exigir la libertad de navegación…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_la_Vuelta_de_Obligado'
  },
  '03-29': {
    year: '1829',
    text: 'Fallece el militar potosino Cornelio Saavedra',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo'
  },
  '03-30': {
    year: '1620',
    text: 'Por decretal del papa Paulo V se crea la diócesis de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Paulo_V'
  },
  '03-31': {
    year: '1839',
    text: 'Las fuerzas de Pascual Echagüe, leales al caudillo bonaerense Juan Manuel de Rosas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Pago_Largo'
  },
  '04-01': {
    year: '1856',
    text: 'Fallece en Buenos Aires militar porteño Eustoquio Díaz Vélez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Eustoquio_D%C3%ADaz_V%C3%A9lez'
  },
  '04-02': {
    year: '1982',
    text: 'Inicio de la Guerra de Malvinas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_de_las_Malvinas'
  },
  '04-03': {
    year: '1588',
    text: 'Por orden del adelantado Juan Torres de Vera y Aragón',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Torres_de_Vera_y_Arag%C3%B3n'
  },
  '04-04': {
    year: '1945',
    text: 'El Movimiento de Intransigencia y Renovación de la Unión Cívica Radical se funda en Avellaneda',
    wikiUrl: 'https://es.wikipedia.org/wiki/Uni%C3%B3n_C%C3%ADvica_Radical'
  },
  '04-05': {
    year: '1933',
    text: 'Se funda en Buenos Aires el Instituto Nacional Sanmartiniano',
    wikiUrl: 'https://es.wikipedia.org/wiki/Instituto_Nacional_Sanmartiniano'
  },
  '04-06': {
    year: '1951',
    text: 'Se funda la Estación Científica Almirante Brown, en la bahía Paraíso, Antártida Argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bah%C3%ADa_Para%C3%ADso'
  },
  '04-07': {
    year: '1894',
    text: 'Aparece en Buenos Aires el primer número del diario socialista La Vanguardia',
    wikiUrl: 'https://es.wikipedia.org/wiki/La_Vanguardia_(peri%C3%B3dico_argentino)'
  },
  '04-08': {
    year: '1871',
    text: 'Fallece el médico, naturalista y paleontólogo bonaerense Francisco Javier Muñiz',
    wikiUrl: 'https://es.wikipedia.org/wiki/Francisco_Javier_Mu%C3%B1iz'
  },
  '04-09': {
    year: '1953',
    text: 'Fallece por su propia mano Juan Duarte, hermano de Evita y secretario privado del presidente…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Ram%C3%B3n_Duarte'
  },
  '04-10': {
    year: '1934',
    text: 'Fallece la primera médica argentina, la porteña Cecilia Grierson, higienista y educadora',
    wikiUrl: 'https://es.wikipedia.org/wiki/Cecilia_Grierson'
  },
  '04-11': {
    year: '1828',
    text: 'Por orden de Juan Manuel de Rosas, Ramón Estomba y Narciso Parchappe marchan hacia el sur de la…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_de_Rosas'
  },
  '04-12': {
    year: '1862',
    text: 'Victorioso en la Batalla de Pavón, Bartolomé Mitre asume la presidencia de la Nación por la…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Pav%C3%B3n'
  },
  '04-13': {
    year: '1813',
    text: 'El general oriental José Gervasio Artigas envía a Buenos Aires sus famosas Instrucciones de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Gervasio_Artigas'
  },
  '04-14': {
    year: '1979',
    text: 'El boxeador Víctor Galíndez conquista nuevamente el título mundial de los mediopesados',
    wikiUrl: 'https://es.wikipedia.org/wiki/V%C3%ADctor_Gal%C3%ADndez'
  },
  '04-15': {
    year: '1953',
    text: 'Estallan dos bombas en la Plaza de Mayo mientras el presidente Juan Domingo Perón da un…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Atentado_de_la_Plaza_de_Mayo_del_15_de_abril_de_1953'
  },
  '04-16': {
    year: '1582',
    text: 'El gobernador de Tucumán, Hernando de Lerma',
    wikiUrl: 'https://es.wikipedia.org/wiki/Hernando_de_Lerma'
  },
  '04-17': {
    year: '1951',
    text: 'Se crea el Instituto Antártico Argentino, bautizado en honor de Hernán Pujato',
    wikiUrl: 'https://es.wikipedia.org/wiki/Instituto_Ant%C3%A1rtico_Argentino'
  },
  '04-18': {
    year: '1978',
    text: 'Se inaugura el complejo hidroeléctrico de Futaleufú, en la provincia del Chubut',
    wikiUrl: 'https://es.wikipedia.org/wiki/Complejo_hidroel%C3%A9ctrico_Futaleuf%C3%BA'
  },
  '04-19': {
    year: '1593',
    text: 'El conquistador Francisco de Argañaraz y Murguía funda San Salvador de Jujuy',
    wikiUrl: 'https://es.wikipedia.org/wiki/Francisco_de_Arga%C3%B1araz_y_Murgu%C3%ADa'
  },
  '04-20': {
    year: '1965',
    text: 'Fallece el diplomático y político socialista porteño Alfredo Palacios',
    wikiUrl: 'https://es.wikipedia.org/wiki/Alfredo_Palacios'
  },
  '04-21': {
    year: '1822',
    text: 'En la batalla de Riobamba, 96 granaderos al mando de Juan Galo Lavalle derrotan tropas…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Combate_de_Riobamba'
  },
  '04-22': {
    year: '1892',
    text: 'Tomás Masón funda la ciudad de Santa Rosa, actual capital de la provincia de La Pampa',
    wikiUrl: 'https://es.wikipedia.org/wiki/Santa_Rosa_(La_Pampa)'
  },
  '04-23': {
    year: '1804',
    text: 'Rafael de Sobremonte, intendente de Córdoba',
    wikiUrl: 'https://es.wikipedia.org/wiki/Virreinato_del_R%C3%ADo_de_la_Plata'
  },
  '04-24': {
    year: '1917',
    text: 'El presidente Hipólito Yrigoyen interviene la provincia de Buenos Aires debido al fraude…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Hip%C3%B3lito_Yrigoyen'
  },
  '04-25': {
    year: '1857',
    text: 'Se inaugura el primer edificio del Teatro Colón, en la Plaza de Mayo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Teatro_Col%C3%B3n'
  },
  '04-26': {
    year: '1905',
    text: 'Se funda el Club Argentino de Ajedrez'
  },
  '04-27': {
    year: '1956',
    text: 'El general Pedro Eugenio Aramburu, líder de la auto-denominada Revolución Libertadora que…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_Libertadora_(Argentina)'
  },
  '04-28': {
    year: '1948',
    text: 'Por primera vez el Comité Nacional de la Unión Cívica Radical cuenta con mayoría intransigente',
    wikiUrl: 'https://es.wikipedia.org/wiki/Uni%C3%B3n_C%C3%ADvica_Radical'
  },
  '04-29': {
    year: '1808',
    text: 'El Cabildo de Buenos Aires rechaza las pretensiones de Juan VI de Portugal',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerras_Napole%C3%B3nicas'
  },
  '04-30': {
    year: '1775',
    text: 'Nace el político y militar porteño Nicolás Rodríguez Peña',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo'
  },
  '05-01': {
    year: '1851',
    text: 'El entrerriano Justo José de Urquiza publica su Pronunciamiento contra Juan Manuel de Rosas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Caseros'
  },
  '05-02': {
    year: '1956',
    text: 'Se inaugura en Buenos Aires la Universidad del Salvador',
    wikiUrl: 'https://es.wikipedia.org/wiki/Universidad_del_Salvador'
  },
  '05-03': {
    year: '1865',
    text: 'El gobierno argentino recibe la declaración de guerra del Paraguay',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_de_la_Triple_Alianza'
  },
  '05-04': {
    year: '1872',
    text: 'Se crea el Departamento Nacional de Agricultura'
  },
  '05-05': {
    year: '1813',
    text: 'La Asamblea General Constituyente declara fiesta cívica el aniversario de la Revolución de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo'
  },
  '05-06': {
    year: '1809',
    text: 'Nace el escritor, historiador y jurista porteño Juan María Gutiérrez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Constituci%C3%B3n_Argentina_de_1853'
  },
  '05-07': {
    year: '1928',
    text: 'Fallece la poetisa y activista por los derechos del invidente Vicenta Castro Cambón',
    wikiUrl: 'https://es.wikipedia.org/wiki/Vicenta_Castro_Camb%C3%B3n'
  },
  '05-08': {
    year: '1813',
    text: 'Asamblea del Año XIII',
    wikiUrl: 'https://es.wikipedia.org/wiki/Asamblea_del_A%C3%B1o_XIII'
  },
  '05-09': {
    year: '1867',
    text: 'Se funda el Buenos Aires Football Club, el primer club de fútbol en Argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Buenos_Aires_Football_Club'
  },
  '05-10': {
    year: '1858',
    text: 'Fallece el sabio naturalista francés Aimé Bonpland en su residencia de Santa Ana de los…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Aim%C3%A9_Bonpland'
  },
  '05-11': {
    year: '1813',
    text: 'Se aprueba la creación del Himno Nacional Argentino',
    wikiUrl: 'https://es.wikipedia.org/wiki/Himno_Nacional_Argentino'
  },
  '05-12': {
    year: '1821',
    text: 'Se edita el primer número del periódico porteño El Argos',
    wikiUrl: 'https://es.wikipedia.org/wiki/El_Argos_de_Buenos_Aires'
  },
  '05-13': {
    year: '1934',
    text: 'Fallece el naturalista porteño Ángel Gallardo',
    wikiUrl: 'https://es.wikipedia.org/wiki/%C3%81ngel_Gallardo'
  },
  '05-14': {
    year: '1985',
    text: 'Fallece el poeta y ensayista porteño César Fernández Moreno',
    wikiUrl: 'https://es.wikipedia.org/wiki/C%C3%A9sar_Fern%C3%A1ndez_Moreno'
  },
  '05-15': {
    year: '1961',
    text: 'La Fuerza Aérea Argentina crea su División Antártica',
    wikiUrl: 'https://es.wikipedia.org/wiki/Fuerza_A%C3%A9rea_Argentina'
  },
  '05-16': {
    year: '1892',
    text: 'Se funda el Instituto Libre de Segunda Enseñanza (ILSE)',
    wikiUrl: 'https://es.wikipedia.org/wiki/Instituto_Libre_de_Segunda_Ense%C3%B1anza'
  },
  '05-17': {
    year: '1892',
    text: 'Fallece el legislador y literato porteño Pedro Goyena, fundador del periódico católico La Unión',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pedro_Goyena'
  },
  '05-18': {
    text: 'Día de la Escarapela',
    wikiUrl: 'https://es.wikipedia.org/wiki/Escarapela_de_Argentina'
  },
  '05-19': {
    year: '1953',
    text: 'Fallece el escritor tucumano Fausto Burgos',
    wikiUrl: 'https://es.wikipedia.org/wiki/Fausto_Burgos'
  },
  '05-20': {
    year: '1591',
    text: 'El gobernador Juan Ramírez de Velasco funda la Ciudad de Todos los Santos de la Nueva Rioja',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Ram%C3%ADrez_de_Velasco'
  },
  '05-21': {
    year: '1903',
    text: 'Se inaugura la Fuente de las Nereidas, de la escultora salteña Lola Mora',
    wikiUrl: 'https://es.wikipedia.org/wiki/Fuente_Monumental_Las_Nereidas'
  },
  '05-22': {
    year: '1976',
    text: 'Muere asesinado en Nevada, Estados Unidos, el boxeador argentino Oscar Ringo Bonavena',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ringo_Bonavena'
  },
  '05-23': {
    year: '1936',
    text: 'Inauguración del Obelisco de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Obelisco_de_Buenos_Aires'
  },
  '05-24': {
    year: '1866',
    text: 'Batalla de Tuyutí',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Tuyut%C3%AD'
  },
  '05-25': {
    year: '1810',
    text: 'Revolución de Mayo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo'
  },
  '05-26': {
    year: '1810',
    text: 'Primera Junta de Gobierno',
    wikiUrl: 'https://es.wikipedia.org/wiki/Primera_Junta'
  },
  '05-27': {
    year: '1810',
    text: 'Mariano Moreno, secretario de la Primera Junta',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mariano_Moreno'
  },
  '05-28': {
    year: '1810',
    text: 'Primer número de la Gazeta de Buenos Ayres',
    wikiUrl: 'https://es.wikipedia.org/wiki/Gazeta_de_Buenos-Ayres'
  },
  '05-29': {
    text: 'Día del Ejército Argentino',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ej%C3%A9rcito_Argentino'
  },
  '05-30': {
    year: '1997',
    text: 'Día Nacional de la Donación de Órganos'
  },
  '05-31': {
    year: '1852',
    text: 'Convocados los gobernadores de las provincias argentinas por el general Justo José de Urquiza',
    wikiUrl: 'https://es.wikipedia.org/wiki/Justo_Jos%C3%A9_de_Urquiza'
  },
  '06-01': {
    year: '1826',
    text: 'Bernardino Rivadavia asume como presidente',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bernardino_Rivadavia'
  },
  '06-02': {
    year: '1923',
    text: 'se funda el club Atlético Santa Rosa, de La Pampa',
    wikiUrl: 'https://es.wikipedia.org/wiki/Club_Atl%C3%A9tico_Santa_Rosa'
  },
  '06-03': {
    year: '1770',
    text: 'Nacimiento de Manuel Belgrano',
    wikiUrl: 'https://es.wikipedia.org/wiki/Manuel_Belgrano'
  },
  '06-04': {
    year: '1943',
    text: 'Golpe de Estado del 4 de junio · Revolución del 43',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_del_43'
  },
  '06-05': {
    year: '1888',
    text: 'Singular terremoto del Río de la Plata de 1888. Argentina carece de regiones asísimicas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Terremoto_del_R%C3%ADo_de_la_Plata_de_1888'
  },
  '06-06': {
    year: '1973',
    text: 'la CGT (Confederación General del Trabajo) y la CGE (Confederación General Económica) de la…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Confederaci%C3%B3n_General_del_Trabajo_de_la_Rep%C3%BAblica_Argentina'
  },
  '06-07': {
    year: '1810',
    text: 'Fundación de la Gazeta · Día del Periodista',
    wikiUrl: 'https://es.wikipedia.org/wiki/Gazeta_de_Buenos-Ayres'
  },
  '06-08': {
    year: '1970',
    text: 'En un golpe de Estado resulta derrocado el general Juan Carlos Onganía (también dictador de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Carlos_Ongan%C3%ADa'
  },
  '06-09': {
    year: '1956',
    text: 'Levantamiento del general Juan José Valle',
    wikiUrl: 'https://es.wikipedia.org/wiki/Levantamiento_de_Valle'
  },
  '06-10': {
    text: 'Día de la afirmación de los derechos argentinos sobre las Malvinas',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Afirmaci%C3%B3n_de_los_Derechos_Argentinos_sobre_las_Malvinas'
  },
  '06-11': {
    year: '1580',
    text: 'Segunda fundación de Buenos Aires por Juan de Garay',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_de_Garay'
  },
  '06-12': {
    year: '1956',
    text: 'Fusilamiento del general Juan José Valle',
    wikiUrl: 'https://es.wikipedia.org/wiki/Levantamiento_de_Valle'
  },
  '06-13': {
    year: '1967',
    text: 'Inauguración del Planetario Galileo Galilei',
    wikiUrl: 'https://es.wikipedia.org/wiki/Planetario_Galileo_Galilei'
  },
  '06-14': {
    year: '1928',
    text: 'Nacimiento de Ernesto «Che» Guevara en Rosario',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ernesto_Guevara'
  },
  '06-15': {
    text: 'Día Nacional del Libro',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_del_Libro'
  },
  '06-16': {
    year: '1955',
    text: 'Bombardeo de Plaza de Mayo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bombardeo_de_Plaza_de_Mayo'
  },
  '06-17': {
    year: '2002',
    text: 'Muere en Capital Federal el policía, dactilóscopo y profesor Federico Vattuone',
    wikiUrl: 'https://es.wikipedia.org/wiki/Capital_Federal'
  },
  '06-18': {
    year: '2010',
    text: 'Fallece José Saramago, escritor, periodista y dramaturgo portugués'
  },
  '06-19': {
    year: '1884',
    text: 'Fallecimiento de Juan Bautista Alberdi',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Bautista_Alberdi'
  },
  '06-20': {
    year: '1820',
    text: 'Fallecimiento de Manuel Belgrano · Día de la Bandera',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Bandera_(Argentina)'
  },
  '06-21': {
    year: '1813',
    text: 'El Ejército del Norte al mando de Manuel Belgrano, continuando su marcha hacia el norte',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ej%C3%A9rcito_del_Norte_(Provincias_Unidas_del_R%C3%ADo_de_la_Plata)'
  },
  '06-22': {
    year: '1986',
    text: 'Maradona anota ante Inglaterra en el Mundial',
    wikiUrl: 'https://es.wikipedia.org/wiki/Diego_Armando_Maradona'
  },
  '06-23': {
    year: '1961',
    text: 'Entra en vigor el Tratado Antártico, del cual Argentina es uno de los países signatarios',
    wikiUrl: 'https://es.wikipedia.org/wiki/Tratado_Ant%C3%A1rtico'
  },
  '06-24': {
    year: '1935',
    text: 'Fallecimiento de Carlos Gardel',
    wikiUrl: 'https://es.wikipedia.org/wiki/Carlos_Gardel'
  },
  '06-25': {
    year: '1978',
    text: 'Argentina campeón del Mundial de Fútbol',
    wikiUrl: 'https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol_de_1978'
  },
  '06-26': {
    year: '1821',
    text: 'Nacimiento de Bartolomé Mitre',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bartolom%C3%A9_Mitre'
  },
  '06-27': {
    year: '1806',
    text: 'Primera Invasión Inglesa · ocupación de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Invasiones_inglesas'
  },
  '06-28': {
    year: '1966',
    text: 'Un golpe de estado derroca al presidente argentino Arturo Umberto Illia',
    wikiUrl: 'https://es.wikipedia.org/wiki/Golpe_de_estado'
  },
  '06-29': {
    year: '1989',
    text: 'Osvaldo Pugliese y Astor Piazzolla compartieron un recital juntos en el teatro Carré de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Osvaldo_Pugliese'
  },
  '06-30': {
    year: '2006',
    text: 'Argentina queda eliminada de la Copa Mundial de la FIFA 2006',
    wikiUrl: 'https://es.wikipedia.org/wiki/Selecci%C3%B3n_de_f%C3%BAtbol_de_Argentina'
  },
  '07-01': {
    year: '1974',
    text: 'Fallecimiento de Juan Domingo Perón',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Domingo_Per%C3%B3n'
  },
  '07-02': {
    year: '1982',
    text: 'la selección de fútbol de Argentina queda eliminada de la Copa Mundial de Fútbol al perder 1-3…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Selecci%C3%B3n_de_f%C3%BAtbol_de_Argentina'
  },
  '07-03': {
    year: '1967',
    text: 'Sale a la venta el sencillo de Los Gatos con La balsa y Ayer nomás',
    wikiUrl: 'https://es.wikipedia.org/wiki/Los_Gatos'
  },
  '07-04': {
    year: '1926',
    text: 'Nace en el barrio porteño de Barracas el ex futbolista y ex entrenador Alfredo di Stéfano',
    wikiUrl: 'https://es.wikipedia.org/wiki/Barracas_(Buenos_Aires)'
  },
  '07-05': {
    year: '1683',
    text: 'Fernando de Mendoza y Mate de Luna funda San Fernando del Valle de Catamarca',
    wikiUrl: 'https://es.wikipedia.org/wiki/Fernando_de_Mendoza_y_Mate_de_Luna'
  },
  '07-06': {
    year: '1573',
    text: 'Fundación de Córdoba por Jerónimo Luis de Cabrera',
    wikiUrl: 'https://es.wikipedia.org/wiki/C%C3%B3rdoba_(Argentina)'
  },
  '07-07': {
    year: '1963',
    text: 'se realizan elecciones presidenciales con el peronismo proscripto nuevamente',
    wikiUrl: 'https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1963'
  },
  '07-08': {
    year: '1989',
    text: 'Raúl Alfonsín le traspasa anticipadamente la presidencia a Carlos Saúl Menem',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ra%C3%BAl_Alfons%C3%ADn'
  },
  '07-09': {
    year: '1816',
    text: 'Declaración de la Independencia',
    wikiUrl: 'https://es.wikipedia.org/wiki/Declaraci%C3%B3n_de_independencia_de_la_Argentina'
  },
  '07-10': {
    year: '1893',
    text: 'El Cnel. Benjamín Moritán le traspasa el mando de gobernador del Territorio Nacional de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Benjam%C3%ADn_Morit%C3%A1n'
  },
  '07-11': {
    year: '1865',
    text: 'Fallece Felipe Arana, Jurisconsulto y político argentino que fue Ministro de Relaciones…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Felipe_Arana'
  },
  '07-12': {
    year: '1780',
    text: 'Nace en el cantón de Toroca, Potosí, Alto Perú',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juana_Azurduy'
  },
  '07-13': {
    year: '1862',
    text: 'Se inaugura el Monumento al Gral. San Martín en la Plaza General San Martín de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Monumento_al_General_San_Mart%C3%ADn_y_a_los_Ej%C3%A9rcitos_de_la_Independencia'
  },
  '07-14': {
    year: '1999',
    text: 'Argentina y Reino Unido firman en Londres un acuerdo que permite el acceso de argentinos a las…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Islas_Malvinas'
  },
  '07-15': {
    year: '1954',
    text: 'Nace en Bell Ville, Córdoba, Mario Alberto Kempes',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bell_Ville'
  },
  '07-16': {
    year: '1893',
    text: 'Finaliza su publicación el diario porteño El Mosquito',
    wikiUrl: 'https://es.wikipedia.org/wiki/El_Mosquito_(Argentina)'
  },
  '07-17': {
    year: '1995',
    text: 'Muere Juan Manuel Fangio, pentacampeón mundial de Fórmula 1',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_Fangio'
  },
  '07-18': {
    year: '1994',
    text: 'Atentado a la AMIA',
    wikiUrl: 'https://es.wikipedia.org/wiki/Atentado_a_la_AMIA'
  },
  '07-19': {
    year: '2007',
    text: 'Fallece en Rosario el humorista gráfico y escritor Roberto Fontanarrosa alias "El Negro"',
    wikiUrl: 'https://es.wikipedia.org/wiki/Rosario_(Argentina)'
  },
  '07-20': {
    year: '1969',
    text: 'Se oficializa el Día del amigo, en homenaje a la primera llegada del hombre a la Luna',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_del_amigo'
  },
  '07-21': {
    year: '1938',
    text: 'Fin de la Guerra del Chaco · tratado de paz',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_del_Chaco'
  },
  '07-22': {
    year: '1990',
    text: 'Fallece en Cuernavaca, México, Manuel Puig, un destacado escritor argentino',
    wikiUrl: 'https://es.wikipedia.org/wiki/Manuel_Puig'
  },
  '07-23': {
    year: '1884',
    text: 'Se realiza en Montevideo la famosa payada entre Juan Nava y Gabino Ezeiza',
    wikiUrl: 'https://es.wikipedia.org/wiki/Gabino_Ezeiza'
  },
  '07-24': {
    year: '1896',
    text: 'Se inaugura el Hospital Pirovano, el nombre del hospital homenajea al Dr',
    wikiUrl: 'https://es.wikipedia.org/wiki/Hospital_Pirovano'
  },
  '07-25': {
    year: '1918',
    text: 'Fallece en Buenos Aires Carlos Guido y Spano, poeta argentino cultor del romanticismo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Carlos_Guido_y_Spano'
  },
  '07-26': {
    year: '1952',
    text: 'Fallecimiento de Eva Perón',
    wikiUrl: 'https://es.wikipedia.org/wiki/Eva_Per%C3%B3n'
  },
  '07-27': {
    year: '1890',
    text: 'se produce la Batalla en Córdoba y Talcahuano (Buenos Aires) y se llega a un cese del fuego',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_del_Parque'
  },
  '07-28': {
    year: '1821',
    text: 'el general argentino José de San Martín proclama la Independencia del Perú',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_de_San_Mart%C3%ADn'
  },
  '07-29': {
    year: '1966',
    text: 'Noche de los Bastones Largos',
    wikiUrl: 'https://es.wikipedia.org/wiki/Noche_de_los_Bastones_Largos'
  },
  '07-30': {
    year: '1957',
    text: 'Nace Nery Pumpido, arquero de Unión de Santa Fe, Vélez Sársfield y River Plate',
    wikiUrl: 'https://es.wikipedia.org/wiki/Nery_Pumpido'
  },
  '07-31': {
    year: '1954',
    text: 'Muere el piloto de Fórmula 1 Onofre Marimón',
    wikiUrl: 'https://es.wikipedia.org/wiki/F%C3%B3rmula_1'
  },
  '08-01': {
    year: '1776',
    text: 'Creación del Virreinato del Río de la Plata',
    wikiUrl: 'https://es.wikipedia.org/wiki/Virreinato_del_R%C3%ADo_de_la_Plata'
  },
  '08-02': {
    year: '1984',
    text: 'Muere el caricaturista Quirino Cristiani, productor de El apóstol',
    wikiUrl: 'https://es.wikipedia.org/wiki/Quirino_Cristiani'
  },
  '08-03': {
    year: '1854',
    text: 'Se funda Quequén, localidad y ciudad balnearia de la provincia de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Quequ%C3%A9n'
  },
  '08-04': {
    year: '1900',
    text: 'Nacimiento de Arturo Umberto Illia',
    wikiUrl: 'https://es.wikipedia.org/wiki/Arturo_Umberto_Illia'
  },
  '08-05': {
    year: '1956',
    text: 'Juan Manuel Fangio gana el gran premio de Alemania',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_Fangio'
  },
  '08-06': {
    year: '1864',
    text: 'Muere el diputado bonaerense Pedro Alcántara de Somellera',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pedro_Alc%C3%A1ntara_de_Somellera'
  },
  '08-07': {
    year: '1890',
    text: 'Carlos Pellegrini accede a la Presidencia de Argentina, tras la renuncia de Miguel Juárez Celman',
    wikiUrl: 'https://es.wikipedia.org/wiki/Carlos_Pellegrini'
  },
  '08-08': {
    year: '1958',
    text: 'Nace la actriz Cecilia Roth, esposa de Fito Páez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Cecilia_Roth'
  },
  '08-09': {
    year: '1812',
    text: 'Belgrano iza la bandera en Rosario',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bandera_de_Argentina'
  },
  '08-10': {
    year: '1912',
    text: 'Se crea la Escuela de Aviación Militar en El Palomar, Argentina'
  },
  '08-11': {
    year: '1820',
    text: 'Batalla de Cepeda',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Cepeda_(1820)'
  },
  '08-12': {
    year: '1806',
    text: 'Reconquista de Buenos Aires · Invasiones inglesas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Reconquista_de_Buenos_Aires'
  },
  '08-13': {
    year: '1924',
    text: 'Muere el compositor Julián Aguirre',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juli%C3%A1n_Aguirre'
  },
  '08-14': {
    year: '1985',
    text: 'Concluye la primera fase del Juicio a las Juntas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juicio_a_las_Juntas'
  },
  '08-15': {
    year: '1904',
    text: 'Se funda la Asociación Atlética Argentinos Juniors en el barrio porteño de Villa Crespo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Asociaci%C3%B3n_Atl%C3%A9tica_Argentinos_Juniors'
  },
  '08-16': {
    year: '1958',
    text: 'Nace en Buenos Aires José Luis Clerc, exjugador profesional de tenis',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Luis_Clerc'
  },
  '08-17': {
    year: '1850',
    text: 'Fallecimiento del Gral. José de San Martín',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_de_San_Mart%C3%ADn'
  },
  '08-18': {
    year: '1981',
    text: 'Nace el futbolista César Delgado, de Rosario Central',
    wikiUrl: 'https://es.wikipedia.org/wiki/C%C3%A9sar_Delgado'
  },
  '08-19': {
    year: '1945',
    text: 'Nace el cantante Sandro de América',
    wikiUrl: 'https://es.wikipedia.org/wiki/Sandro'
  },
  '08-20': {
    year: '1969',
    text: 'Primer vuelo del prototipo IA-58 Pucará',
    wikiUrl: 'https://es.wikipedia.org/wiki/IA-58_Pucar%C3%A1'
  },
  '08-21': {
    year: '1946',
    text: 'El Senado de la Nación aprueba el proyecto de ley sobre Derechos Políticos de la Mujer'
  },
  '08-22': {
    year: '1972',
    text: 'Fuga del Penal de Rawson · Masacre de Trelew',
    wikiUrl: 'https://es.wikipedia.org/wiki/Masacre_de_Trelew'
  },
  '08-23': {
    year: '1862',
    text: 'en Buenos Aires, muere el Dr. Eduardo Acevedo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Eduardo_Acevedo'
  },
  '08-24': {
    year: '1899',
    text: 'Nacimiento de Jorge Luis Borges',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jorge_Luis_Borges'
  },
  '08-25': {
    year: '1992',
    text: 'Se firma un tratado en el Mercosur donde se garantiza libre comercio entre los países…'
  },
  '08-26': {
    year: '1914',
    text: 'Nacimiento de Julio Cortázar',
    wikiUrl: 'https://es.wikipedia.org/wiki/Julio_Cort%C3%A1zar'
  },
  '08-27': {
    year: '1920',
    text: 'Primera transmisión radiofónica desde el Teatro Coliseo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Radio_en_Argentina'
  },
  '08-28': {
    text: 'Día del Genetista',
    wikiUrl: 'https://es.wikipedia.org/wiki/Gen%C3%A9tica'
  },
  '08-29': {
    year: '1810',
    text: 'Nacimiento de Juan Bautista Alberdi · Día del Abogado',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Bautista_Alberdi'
  },
  '08-30': {
    year: '1857',
    text: 'Inauguración del primer ferrocarril argentino',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ferrocarril_Oeste_de_Buenos_Aires'
  },
  '08-31': {
    year: '1953',
    text: 'Nace el piloto Miguel Ángel Guerra',
    wikiUrl: 'https://es.wikipedia.org/wiki/Miguel_%C3%81ngel_Guerra_(piloto)'
  },
  '09-01': {
    year: '1838',
    text: 'Nace en Buenos Aires el jurisconsulto, militar',
    wikiUrl: 'https://es.wikipedia.org/wiki/Dardo_Rocha'
  },
  '09-02': {
    year: '1820',
    text: 'Batalla de Gamonal en el marco de la Anarquía del Año XX',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Gamonal'
  },
  '09-03': {
    year: '1854',
    text: 'Bartolomé Mitre funda el Instituto Histórico-Geográfico del Río de la Plata',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bartolom%C3%A9_Mitre'
  },
  '09-04': {
    year: '1957',
    text: 'Editorial Frontera comienza a publicar la revista de historietas Hora Cero semanal',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Historieta'
  },
  '09-05': {
    year: '1927',
    text: 'Vicente Almandos Almonacid funda Aeroposta Argentina, primera empresa aerocomercial del país',
    wikiUrl: 'https://es.wikipedia.org/wiki/Vicente_Almandos_Almonacid_(hijo)'
  },
  '09-06': {
    year: '1921',
    text: 'Muere el gobernador de Buenos Aires Dardo Rocha, fundador de la ciudad de La Plata',
    wikiUrl: 'https://es.wikipedia.org/wiki/Dardo_Rocha'
  },
  '09-07': {
    year: '1810',
    text: 'La Junta de Gobierno que surgió luego de los sucesos de Mayo de 1810'
  },
  '09-08': {
    year: '1944',
    text: 'Día del Agricultor. El 28 de agosto de 1944, por decreto N.º 23.317'
  },
  '09-09': {
    year: '1947',
    text: 'La ley 13.010 reconoce el voto femenino en Argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Sufragio_universal'
  },
  '09-10': {
    year: '1985',
    text: 'Día del Terapista Ocupacional'
  },
  '09-11': {
    year: '1852',
    text: 'Día de la rebelión de la provincia de Buenos Aires contra el gobierno federal y posterior…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_del_11_de_septiembre_de_1852'
  },
  '09-12': {
    year: '1904',
    text: 'Inauguración de la ciudad de Neuquén',
    wikiUrl: 'https://es.wikipedia.org/wiki/Neuqu%C3%A9n_(ciudad)'
  },
  '09-13': {
    year: '1810',
    text: 'la Primera Junta crea la Biblioteca Pública',
    wikiUrl: 'https://es.wikipedia.org/wiki/Primera_Junta'
  },
  '09-14': {
    year: '1923',
    text: 'El boxeador argentino Luis Ángel Firpo combate por el título de los pesados ante Jack Dempsey…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Luis_%C3%81ngel_Firpo'
  },
  '09-15': {
    year: '1865',
    text: 'Designada en homenaje al doctor Guillermo Rawson'
  },
  '09-16': {
    year: '1955',
    text: 'El Golpe de Estado 1955 fue una sublevación cívico-militar antiperonista que derrocó todos los…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Golpe_de_Estado_en_Argentina_de_septiembre_de_1955'
  },
  '09-17': {
    year: '2011',
    text: 'Fallece en accidente automovilístico el compositor musical e intérprete Hugo Giménez Agüero en…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Hugo_Gim%C3%A9nez_Ag%C3%BCero'
  },
  '09-18': {
    year: '1854',
    text: 'El paleontólogo Florentino Ameghino nace en Moneglia (Génova, Italia)',
    wikiUrl: 'https://es.wikipedia.org/wiki/Florentino_Ameghino'
  },
  '09-19': {
    year: '1841',
    text: 'en Famaillá (provincia de Tucumán, en Argentina) se libra la batalla de Famaillá'
  },
  '09-20': {
    year: '1999',
    text: 'Día Nacional del Caballo'
  },
  '09-21': {
    text: 'Día del Estudiante · comienzo de la primavera',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_del_Estudiante'
  },
  '09-22': {
    year: '1866',
    text: 'Batalla de Curupaytí',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Curupayt%C3%AD'
  },
  '09-23': {
    year: '1850',
    text: 'Muere en el Paraguay el guerrero de la independencia y caudillo oriental José Gervasio de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Gervasio_de_Artigas'
  },
  '09-24': {
    year: '1841',
    text: 'Fallece Antonio Beruti, militar revolucionario argentino que participó en la Revolución de Mayo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo'
  },
  '09-25': {
    year: '1962',
    text: 'Fallece en Estados Unidos la filóloga y escritora María Rosa Lida de Malkiel',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mar%C3%ADa_Rosa_Lida_de_Malkiel'
  },
  '09-26': {
    year: '1878',
    text: 'Se funda la ciudad argentina de Maipú por Francisco Bernabé Madero'
  },
  '09-27': {
    year: '1901',
    text: 'En el edificio primitivamente destinado a la Lotería Nacional, en la calle Perú (Buenos Aires)'
  },
  '09-28': {
    year: '1927',
    text: 'Se inaugura en Buenos Aires el Museo Etnográfico de la Facultad de Filosofía y Letras'
  },
  '09-29': {
    year: '1565',
    text: 'Diego de Villarroel funda la ciudad de Tucumán',
    wikiUrl: 'https://es.wikipedia.org/wiki/Diego_de_Villarroel'
  },
  '09-30': {
    year: '1979',
    text: 'Muere en Buenos Aires el escritor, autor teatral',
    wikiUrl: 'https://es.wikipedia.org/wiki/Rodolfo_Kusch'
  },
  '10-01': {
    year: '1813',
    text: 'Batalla de Vilcapugio en la segunda campaña del Alto Perú en la Guerra Argentina de la…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Vilcapugio'
  },
  '10-02': {
    year: '1809',
    text: 'Nace en Montevideo el escritor, educador, periodista y librero Marcos Sastre',
    wikiUrl: 'https://es.wikipedia.org/wiki/Marcos_Sastre'
  },
  '10-03': {
    year: '1903',
    text: 'Se funda Cipolletti, Provincia de Río Negro',
    wikiUrl: 'https://es.wikipedia.org/wiki/Provincia_de_R%C3%ADo_Negro'
  },
  '10-04': {
    year: '1923',
    text: 'Muere el legislador, diplomático, internacionalista y escritor Estanislao Zeballos',
    wikiUrl: 'https://es.wikipedia.org/wiki/Estanislao_Zeballos'
  },
  '10-05': {
    year: '1815',
    text: 'Fallece en San Fernando (provincia de Buenos Aires)',
    wikiUrl: 'https://es.wikipedia.org/wiki/Hip%C3%B3lito_Vieytes'
  },
  '10-06': {
    year: '2006',
    text: 'Fallece el cineasta Eduardo Mignogna, ganador de premios Goya con "Sol de otoño" (1996)',
    wikiUrl: 'https://es.wikipedia.org/wiki/Eduardo_Mignogna'
  },
  '10-07': {
    year: '1793',
    text: 'Es fundada la ciudad de Rosario',
    wikiUrl: 'https://es.wikipedia.org/wiki/Rosario_(Argentina)'
  },
  '10-08': {
    year: '1812',
    text: 'Fallece Juan José Castelli, político que participó en la Revolución de Mayo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Jos%C3%A9_Castelli'
  },
  '10-09': {
    year: '1934',
    text: 'Día del Guardaparque Nacional'
  },
  '10-10': {
    year: '1977',
    text: 'Muere el notable escultor José Fioravanti',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Fioravanti'
  },
  '10-11': {
    year: '1943',
    text: 'Día del Martillero y Corredor Público. La instauración del 11 de octubre como "Día del…'
  },
  '10-12': {
    year: '1812',
    text: 'Fallece Juan José Castelli, político argentino que participó en la Revolución de Mayo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Jos%C3%A9_Castelli'
  },
  '10-13': {
    year: '1974',
    text: 'Día del Psicólogo'
  },
  '10-14': {
    year: '1959',
    text: 'Se funda la Universidad Tecnológica Nacional',
    wikiUrl: 'https://es.wikipedia.org/wiki/Universidad_Tecnol%C3%B3gica_Nacional'
  },
  '10-15': {
    year: '2001',
    text: 'Día de la mujer rural'
  },
  '10-16': {
    year: '1926',
    text: 'Se inaugura en Buenos Aires el monumento al general Carlos María de Alvear'
  },
  '10-17': {
    year: '1945',
    text: 'Día de la Lealtad',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Lealtad'
  },
  '10-18': {
    year: '1832',
    text: 'La Provincia de Tucumán firma el Pacto Federal',
    wikiUrl: 'https://es.wikipedia.org/wiki/Pacto_Federal'
  },
  '10-19': {
    year: '1836',
    text: 'Fallece Fray Justo Santa María de Oro, diputado del Congreso de Tucumán de 1816',
    wikiUrl: 'https://es.wikipedia.org/wiki/Justo_Santa_Mar%C3%ADa_de_Oro'
  },
  '10-20': {
    year: '1580',
    text: 'El Cabildo de Buenos Aires elige como patrono de la ciudad a San Martín de Tours y patrona a…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Cabildo_de_Buenos_Aires_(instituci%C3%B3n)'
  },
  '10-21': {
    year: '1886',
    text: 'Fallece en Buenos Aires el escritor, periodista y político José Hernández',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Hern%C3%A1ndez'
  },
  '10-22': {
    year: '2004',
    text: 'Se establece el 22 de octubre de cada año como el Día Nacional del Derecho a la Identidad',
    wikiUrl: 'https://es.wikipedia.org/wiki/Abuelas_de_Plaza_de_Mayo'
  },
  '10-23': {
    year: '1859',
    text: 'La Batalla de Cepeda ocurre en la Cañada de Cepeda, Provincia de Santa Fe',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Cepeda_(1859)'
  },
  '10-24': {
    year: '1871',
    text: 'Es inaugurado el Observatorio Astronómico de Córdoba, el primero del país',
    wikiUrl: 'https://es.wikipedia.org/wiki/Observatorio_Astron%C3%B3mico_de_C%C3%B3rdoba'
  },
  '10-25': {
    year: '1967',
    text: 'Día Internacional de la Alfabetización. Su antecedente se encuentra en las disposiciones de la…'
  },
  '10-26': {
    year: '1891',
    text: 'Es fundado el Banco de la Nación Argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Banco_de_la_Naci%C3%B3n_Argentina'
  },
  '10-27': {
    year: '2019',
    text: 'El abogado Alberto Fernández gana las elecciones presidenciales en primera vuelta como…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Alberto_Fern%C3%A1ndez'
  },
  '10-28': {
    year: '1951',
    text: 'El automovilista Juan Manuel Fangio gana su primer campeonato de Fórmula 1',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_Fangio'
  },
  '10-29': {
    year: '1969',
    text: 'Es inaugurada la Base Antártica Marambio',
    wikiUrl: 'https://es.wikipedia.org/wiki/Base_Marambio'
  },
  '10-30': {
    year: '1804',
    text: 'Nace la educadora Bienvenida Sarmiento, hermana de Domingo Faustino Sarmiento',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bienvenida_Sarmiento'
  },
  '10-31': {
    year: '1808',
    text: 'Fallece el poeta y dramaturgo Manuel Lavardén',
    wikiUrl: 'https://es.wikipedia.org/wiki/Manuel_Jos%C3%A9_de_Lavard%C3%A9n'
  },
  '11-01': {
    year: '1786',
    text: 'Nace Mariquita Sánchez de Thompson, en cuya casa se cantó por primera vez el Himno Nacional…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mar%C3%ADa_S%C3%A1nchez_de_Thompson'
  },
  '11-02': {
    year: '1959',
    text: 'Es fundada la Universidad Católica de Cuyo'
  },
  '11-03': {
    year: '1783',
    text: 'Se funda en Buenos Aires el Real Colegio de San Carlos',
    wikiUrl: 'https://es.wikipedia.org/wiki/Colegio_Nacional_de_Buenos_Aires'
  },
  '11-04': {
    year: '1838',
    text: 'Nace Federico Lacroze, empresario argentino cofundador, junto a su hermano Julio',
    wikiUrl: 'https://es.wikipedia.org/wiki/Federico_Lacroze'
  },
  '11-05': {
    year: '1884',
    text: 'Se crea la Biblioteca Nacional de Maestros, en la Ciudad de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Buenos_Aires'
  },
  '11-06': {
    year: '1880',
    text: 'Fallece el periodista, militar y poeta gauchesco Estanislao del Campo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Estanislao_del_Campo'
  },
  '11-07': {
    year: '1810',
    text: 'Se produce la Batalla de Suipacha',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Suipacha'
  },
  '11-08': {
    year: '1814',
    text: 'Creación del Regimiento de Infantería de Montaña 11 "Grl. Las Heras"'
  },
  '11-09': {
    year: '1817',
    text: 'Es creado en Mendoza el Colegio de la Santísima Trinidad, por iniciativa de José de San Martín',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mendoza_(Argentina)'
  },
  '11-10': {
    year: '1834',
    text: 'Nacimiento de José Hernández · Día de la Tradición',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Tradici%C3%B3n'
  },
  '11-11': {
    year: '1875',
    text: 'Se inaugura el Parque Tres de Febrero de la ciudad de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Parque_3_de_Febrero'
  },
  '11-12': {
    year: '1863',
    text: 'Es asesinado el caudillo riojano Ángel Vicente Peñaloza',
    wikiUrl: 'https://es.wikipedia.org/wiki/Provincia_de_La_Rioja_(Argentina)'
  },
  '11-13': {
    year: '1982',
    text: 'Fallece el actor Ángel Magaña, quien se desempeñó en papeles protagónicos en películas como…',
    wikiUrl: 'https://es.wikipedia.org/wiki/%C3%81ngel_Maga%C3%B1a'
  },
  '11-14': {
    year: '1962',
    text: 'Fallece el escritor Manuel Gálvez, autor de obras como El mal metafísico y La maestra normal',
    wikiUrl: 'https://es.wikipedia.org/wiki/Manuel_G%C3%A1lvez'
  },
  '11-15': {
    year: '1573',
    text: 'Es fundada la ciudad de Santa Fe',
    wikiUrl: 'https://es.wikipedia.org/wiki/Santa_Fe_(capital)'
  },
  '11-16': {
    year: '1903',
    text: 'Nacimiento de Eduardo Mallea',
    wikiUrl: 'https://es.wikipedia.org/wiki/Eduardo_Mallea'
  },
  '11-17': {
    year: '1875',
    text: 'Muere el poeta Hilario Ascasubi',
    wikiUrl: 'https://es.wikipedia.org/wiki/Hilario_Ascasubi'
  },
  '11-18': {
    year: '1908',
    text: 'Inauguración del Teatro Colón',
    wikiUrl: 'https://es.wikipedia.org/wiki/Teatro_Col%C3%B3n'
  },
  '11-19': {
    year: '1882',
    text: 'Dardo Rocha funda la ciudad de La Plata, capital de la provincia de Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Dardo_Rocha'
  },
  '11-20': {
    year: '1845',
    text: 'Batalla de la Vuelta de Obligado',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_la_Vuelta_de_Obligado'
  },
  '11-21': {
    year: '1771',
    text: 'Nace Domingo French, un militar argentino que luchó en la Guerra de la Independencia Argentina…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_de_la_Independencia_Argentina'
  },
  '11-22': {
    year: '1861',
    text: 'Muere Paula Albarracín de Sarmiento, madre del prócer Domingo Faustino Sarmiento',
    wikiUrl: 'https://es.wikipedia.org/wiki/Domingo_Faustino_Sarmiento'
  },
  '11-23': {
    text: 'Día de la Soberanía Nacional',
    wikiUrl: 'https://es.wikipedia.org/wiki/D%C3%ADa_de_la_Soberan%C3%ADa_Nacional'
  },
  '11-24': {
    year: '1849',
    text: 'Inglaterra firma un convenio con la Provincia de Buenos Aires (gobernada por Juan Manuel de…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_de_Rosas'
  },
  '11-25': {
    year: '1885',
    text: 'Muere el ex presidente Nicolás Avellaneda',
    wikiUrl: 'https://es.wikipedia.org/wiki/Nicol%C3%A1s_Avellaneda'
  },
  '11-26': {
    year: '1951',
    text: 'En La Plata es inaugurada la República de los Niños',
    wikiUrl: 'https://es.wikipedia.org/wiki/Rep%C3%BAblica_de_los_Ni%C3%B1os'
  },
  '11-27': {
    year: '2004',
    text: 'Fallece el dibujante argentino de historietas Alberto Salinas',
    wikiUrl: 'https://es.wikipedia.org/wiki/Alberto_Salinas'
  },
  '11-28': {
    year: '2000',
    text: 'Boca Juniors, de Argentina, se proclama Campeón Intercontinental por segunda vez en su historia…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Club_Atl%C3%A9tico_Boca_Juniors'
  },
  '11-29': {
    year: '1870',
    text: 'Fallece en Buenos Aires, Enrique Martínez',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_de_independencia_de_la_Argentina'
  },
  '11-30': {
    year: '1853',
    text: 'Constitución Nacional argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Constituci%C3%B3n_argentina_de_1853'
  },
  '12-01': {
    year: '1863',
    text: 'Se inaugura la sucursal del Banco de la Provincia de Buenos Aires en San Nicolás de los Arroyos',
    wikiUrl: 'https://es.wikipedia.org/wiki/Banco_de_la_Provincia_de_Buenos_Aires'
  },
  '12-02': {
    year: '1964',
    text: 'Brasil envía al exiliado Juan Domingo Perón de regreso a España',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Domingo_Per%C3%B3n'
  },
  '12-03': {
    year: '1853',
    text: 'Muere el político Nicolás Rodríguez Peña, protagonista de la Revolución de Mayo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_Mayo'
  },
  '12-04': {
    year: '1845',
    text: 'El gobierno de la provincia de Corrientes',
    wikiUrl: 'https://es.wikipedia.org/wiki/Provincia_de_Corrientes'
  },
  '12-05': {
    year: '1829',
    text: 'Juan Manuel de Rosas ocupa el Poder Ejecutivo Nacional tras varios años de guerra civil',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Manuel_de_Rosas'
  },
  '12-06': {
    year: '1866',
    text: 'El general Felipe Varela se alza contra el gobierno de Bartolomé Mitre',
    wikiUrl: 'https://es.wikipedia.org/wiki/Felipe_Varela'
  },
  '12-07': {
    year: '1874',
    text: 'Bartolomé Mitre es derrotado por el ejército en la batalla de Santa Rosa',
    wikiUrl: 'https://es.wikipedia.org/wiki/Batalla_de_Santa_Rosa_(Mendoza)'
  },
  '12-08': {
    year: '1877',
    text: 'Se inaugura el Hospital Español de Buenos Aires'
  },
  '12-09': {
    year: '1955',
    text: 'Muere el meteorólogo, astrónomo y escritor cordobés Martín Gil',
    wikiUrl: 'https://es.wikipedia.org/wiki/Mart%C3%ADn_Gil'
  },
  '12-10': {
    year: '1983',
    text: 'Asunción de Raúl Alfonsín · retorno a la democracia',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ra%C3%BAl_Alfons%C3%ADn'
  },
  '12-11': {
    year: '1890',
    text: 'Nace el cantante de tango Carlos Gardel',
    wikiUrl: 'https://es.wikipedia.org/wiki/Carlos_Gardel'
  },
  '12-12': {
    year: '1914',
    text: 'Se inaugura en el Cerro de la Gloria de Mendoza el monumento al Ejército de los Andes',
    wikiUrl: 'https://es.wikipedia.org/wiki/Cerro_de_la_Gloria'
  },
  '12-13': {
    year: '1947',
    text: 'Juan Domingo Perón declara que "no [es] partidario ni del régimen capitalista ni del sistema…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Juan_Domingo_Per%C3%B3n'
  },
  '12-14': {
    year: '1824',
    text: 'Inglaterra reconoce la independencia de las provincias Unidas del Río de la Plata'
  },
  '12-15': {
    year: '1874',
    text: 'Se funda la colonia galesa de Gaiman a orillas del río Chubut',
    wikiUrl: 'https://es.wikipedia.org/wiki/R%C3%ADo_Chubut'
  },
  '12-16': {
    year: '1941',
    text: 'Ramón Castillo declara el estado de sitio para acallar las protestas contra la neutralidad…',
    wikiUrl: 'https://es.wikipedia.org/wiki/Segunda_Guerra_Mundial'
  },
  '12-17': {
    year: '1934',
    text: 'Argentores, la agrupación que nuclea a los autores de teatro, televisión y radio de Argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Sociedad_General_de_Autores_de_la_Argentina'
  },
  '12-18': {
    year: '2022',
    text: 'Argentina vence a Francia y conquista la Copa Mundial de la FIFA',
    wikiUrl: 'https://es.wikipedia.org/wiki/Copa_Mundial_de_la_FIFA_2022'
  },
  '12-19': {
    year: '1833',
    text: 'Muere el político Miguel de Azcuénaga, miembro de la Primera Junta de Gobierno de Argentina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Miguel_de_Azcu%C3%A9naga'
  },
  '12-20': {
    year: '1994',
    text: 'La devaluación del peso mexicano provoca una crisis financiera en toda América Latina',
    wikiUrl: 'https://es.wikipedia.org/wiki/Peso_mexicano'
  },
  '12-21': {
    year: '1962',
    text: 'Se crea la Academia Porteña del Lunfardo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Academia_Porte%C3%B1a_del_Lunfardo'
  },
  '12-22': {
    year: '1959',
    text: 'Se crea la Universidad de Mendoza, luego Universidad Nacional de Cuyo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Universidad_Nacional_de_Cuyo'
  },
  '12-23': {
    year: '1951',
    text: 'Muere el compositor de tango Enrique Santos Discépolo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Enrique_Santos_Disc%C3%A9polo'
  },
  '12-24': {
    year: '1962',
    text: 'Se suprime definitivamente el servicio de tranvías en Buenos Aires',
    wikiUrl: 'https://es.wikipedia.org/wiki/Tranv%C3%ADa'
  },
  '12-25': {
    year: '1907',
    text: 'Jorge Newbery hace el primer vuelo aerostático argentino a bordo del globo Pampero',
    wikiUrl: 'https://es.wikipedia.org/wiki/Jorge_Newbery'
  },
  '12-26': {
    year: '2001',
    text: 'Primeros cacerolazos contra el presidente interino Adolfo Rodríguez Saá',
    wikiUrl: 'https://es.wikipedia.org/wiki/Adolfo_Rodr%C3%ADguez_Sa%C3%A1'
  },
  '12-27': {
    year: '1906',
    text: 'Muere el político Bernardo de Irigoyen',
    wikiUrl: 'https://es.wikipedia.org/wiki/Bernardo_de_Irigoyen'
  },
  '12-28': {
    year: '1927',
    text: 'Muere el pintor porteño Ernesto de la Cárcova',
    wikiUrl: 'https://es.wikipedia.org/wiki/Ernesto_de_la_C%C3%A1rcova'
  },
  '12-29': {
    year: '1869',
    text: 'Se crea el Observatorio Astronómico de Córdoba',
    wikiUrl: 'https://es.wikipedia.org/wiki/Observatorio_Astron%C3%B3mico_de_C%C3%B3rdoba'
  },
  '12-30': {
    year: '1923',
    text: 'Se inaugura el servicio aéreo de Buenos Aires a Montevideo',
    wikiUrl: 'https://es.wikipedia.org/wiki/Montevideo'
  },
  '12-31': {
    year: '1902',
    text: 'Muere el pintor porteño Cándido López, que documentó la Guerra de la Triple Alianza',
    wikiUrl: 'https://es.wikipedia.org/wiki/Guerra_de_la_Triple_Alianza'
  }
};

/** Busca efeméride por MM-DD (zona AR). */
export function getEfemerideByMonthDay(monthDay: string): Efemeride | null {
  return EFEMERIDES[monthDay] ?? null;
}

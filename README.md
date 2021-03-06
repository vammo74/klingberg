# Klingberg

Multipliction training app for primary school age children.

Sorry from now on it is in Swedish...

## Premiss

Om man ska klara skolans matte måste man känna till vissa mönster.
En av de viktigaste mönstrerna för låg- och mellanstadie elever är
de multiplikationstabellerna (gångertabbellerna). Utan det här
igenkännadet blir det svårt senare att klara av bl.a. division och
bråk.

Det är inte konstigt att vissa ha brister i korttidsminne vid
ålderna där vi lära oss multiplikationstabellerna (dvs lågstadiet):
skolan tar för det mesta bara hänsyn till ålder inte barnets
nuvarande utveckling.

Det här appen är utvecklat efter en idé från en svensk pedagogik professor Torkel Klingberg.

Obs. det är <ins>min tolkning</ins>: fel eller misforståelse kan och kommer att ske.

## UI

Appen är uppbyggd av en skärm, en interaktiv multiplikationstabell
och en numberpad.

![alt text](https://github.com/vammo74/klingberg/blob/main/components/UI/graphics/apppicture.jpg?raw=true)

## Skärm

Skärmen innerhåller en skärm för produkten som sökas, en skärm som
svaret ska skrivas in, en timer och en indikator på nuvarande nivå
och kvarvarande frågor.

![alt text](https://github.com/vammo74/klingberg/blob/main/components/UI/graphics/screenpicture.jpg?raw=true)

Timer och nivå kan justeras vid behov (se botten av README:n).

## Numberpad

Tryck på "start" och man får en produkt på produktskärm. Knappa in
svaret och tryck på "enter". Om man trycka fel kan man använda
"del" (delete). Om man vill pausa kan man trycka på "stop". Nivå
och kvarvarande produkter (men inte själva produkten) sparas både
när man trycker på "stop" och när man stänger av appen.

![alt text](https://github.com/vammo74/klingberg/blob/main/components/UI/graphics/numberpadpicture.jpg?raw=true)

Man kommer tillbaka till det här fönstret genom att trycka på
"info". Här kan du spara nivån och kvarvarande produkter ("save")
och dessutom radera nivån och kvarvarande produkter ur minne
("clear"). Obs. Om du radera av misstag tryck på spara direkt
efter och informationen kommer inte att raderas.

## Interaktiva tabellen

Interaktiva tabellen innehåller tre olika delar. Tabellsknapper
(mörk lila), tabellceller (ljus lila) och glömde celler (svarta).

![alt text](https://github.com/vammo74/klingberg/blob/main/components/UI/graphics/tablepicture.jpg?raw=true)

Glömde celler är baserat på din nivå: om man är bekväm med fyrans
tabell börjar man på nivå 4 och alla tal fram till 4 gånger 4 är
gömda (läsa vidare om man vill veta hur man ändra nivån).

Om man inte veta ett svar kan man leta reda på det i tabellen. Om
man trycka på en tabellknapp kommer hela raden eller kolumnen att
ändra färg. Om man till exempel söker 6 gånger 6 kan man trycker
på 6 på den horizontala axeln och 6 på den vertikala axeln. Talet
som finns i både linjer av färgade celler (och är en lite grann
mörkare) är ditt önskade talet.

## Nivå och Timer inställning

Nivån ändras genom att skiva in "1", "3" och den önskade nivå ("1" till "9"). Till exempel, för att välja
nivå 4, tryck:

![alt text](https://github.com/vammo74/klingberg/blob/main/components/UI/graphics/levelchange.jpg?raw=true)

Timerhastighet ändras genom att
skriva in "7", "7" och önskade nivån ("1" till "9"), "1" är långsam och "9"
snabbt. Till exempel, för att välja nivå 4, tryck:

![alt text](https://github.com/vammo74/klingberg/blob/main/components/UI/graphics/timer.jpg?raw=true)

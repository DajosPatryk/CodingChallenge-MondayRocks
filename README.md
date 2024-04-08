# Aufgabe

Du bist Teil des Backend-Teams. Das Frontend-Team hat für eine alte Anwendung die Aufgabe bekommen ein neues Frontend zu bauen.
Geplant sind drei Ansichten im Frontend:

### 1. Customer Overview
   Hier wird eine Liste aus userId, userName und score (Wie viel Geld hat der User für Produkte ausgegeben) angezeigt.

### 2. Customer Data
   Hier kann der Nutzername eines Users bearbeitet werden.

### 3. Customer Purchase History
   Hier sind alle Käufe des Nutzers aufgelistet. Die Liste besteht aus: productId, productName, price, purchasedQuantity, purchaseDate

## Anweisungen
Deine Aufgabe ist nun zum einen die Entwicklung neuer Endpunkte, die die benötigten Daten bereitstellen und zusätzlich ein Refactoring des vorliegenden Backends.  
Beim Refactoring bist du frei in der Entscheidung, was du dabei sinnvoll findest. Du kannst den bestehenden Service beliebig verändern oder auch neue Services entwickeln. Auch die Struktur der Datenbank kann angepasst werden.

## Hinweise 

**Eine echte Datenbank anzubinden ist nicht Teil der Aufgabe.**  

Die **Bearbeitungsdauer sollte ca. 30 Minuten betragen**. Uns ist bewusst, dass die Aufgabe sehr offen gestellt ist und daher in 30 Minuten nicht vollständig erledigt werden kann. Prioriät haben die benötigten neuen Funktionalitäten. Zu den Dingen, die sich aus Zeitgründen nicht umsetzen lassen, können wir uns dann in der Besprechung austauschen, bei der es es um folgende Leitfragen gehen wird:
- Was hast du (in den verfügbaren 30 Minuten) gemacht, damit du eine funktionierende Software hast?
- Welche Überarbeitungen/Verbesserungen sind deiner Meinung nach zusätzlich sinnvoll und sollten gemacht werden, so dass du dafür zusätzliche Zeit "anfragen" würdest?
- Welche Überarbeitungen/Verbesserungen sind deiner Meinung nach cool (Nice-to-have), haben aber mit Blick auf die Wirtschaftlichkeit eine geringere Priorität?

## Fragen & Antworten
### Was hast du (in den verfügbaren 30 Minuten) gemacht, damit du eine funktionierende Software hast?

Ich habe vier neue Funktionen geschrieben für "Customer Overview" und "Customer Purchase History". Zusätzlich habe ich "Customer Data" Funkion überarbeitet und alle anderen unnötigen Funktionen gelöscht um **Bloat** zu vermeiden.<br/>
Am ende habe ich mir kurze und präzise Kommentare generieren lassen.<br/><br/>
Ich habe mir noch ~8 Minuten Zeit gegeben um Swagger zu installieren und zu konfigurieren, um die Software leicht testen zu können. Swagger Dokumentation wäre zukünftig auch für das Frontend Team wichtig.
<br/><br/>
### Welche Überarbeitungen/Verbesserungen sind deiner Meinung nach zusätzlich sinnvoll und sollten gemacht werden, so dass du dafür zusätzliche Zeit "anfragen" würdest?

Das Backend ist im jetzigen Zustand zu grob und zu unsicher. Um dies zu verbessern würde ich die folgenden Dinge hinzufügen und konfigurieren:
- **Authorization** - JWT Authorization mit Middleware für die routes mit sensiblen Kundendaten.
- **Data Validation** - Bessere data validation durchführen, vor allem bei update routen.
- **Result Klasse** - Diese Klasse liefert Resultate und Fehlermeldungen zur Präsentation.
- **Error Handling** - Error Klassen die durch unsere Funktionen benutzt werden. Zusätzlich eine Error-Handling Middleware für die routes.
- **Logging Middleware** - Logger die Fehlermeldungen und interessante Resultate speichert. Hier muss man auf sensible Daten achten.
- **Unit und Integration testing** - TS Jest tests für jede meiner Funktionen schreiben. Mind. 80% code coverage erreichen.
- **Datenbank mocks** - Zusätzlich zu den Tests würde ich eine Datenbank mock schreiben.
- **Ordner Struktur ändern** - Controllers Ordner erstellen. Dorthin dann die User/Customer Logik hinzufügen und diese aus db.ts löschen. Zusätzlich services, factories, middlewares und utils Ordner erstellen im src Ordner.
- **Rate Limiting** - Rate limiting gegen brute-force angriffe.
- **Datenbank** - :>

### Welche Überarbeitungen/Verbesserungen sind deiner Meinung nach cool (Nice-to-have), haben aber mit Blick auf die Wirtschaftlichkeit eine geringere Priorität?
Wenn wir mit SQL arbeiten, dann würde ich eine userCollection anlegen die Daten wie Namen des Nutzers besitzt. In der Tabelle userPurchasesCollection würde dann "user_id" sein, anstatt dem namen des Nutzers.

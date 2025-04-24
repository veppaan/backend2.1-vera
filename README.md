**Vera Kippel veki2400**

Ett API byggt med express. 
API:et hanterar ett cv där en användare lägger till jobberfarenheter.
CRUD(Create, Read, Update och Delete) iär implementerad.

Tabellens namn för cv:ts olika jobb heter "resume" som skapats med hjälv av SQLite3.
Tabellens innehåll:
- id(int autoincrement primary key)
- companyname(varchar(50) not null)
- jobtitle(varchar(50) not null)
- job_created(timestamp not null default current_timestamp)

TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

Användning:

|Metod | Ändpunkt | Beskrivning |
-------|----------|-------------|
|GET | "/resume" | Hämta alla lagrade jobberfarenheter|
|POST| "/resume/add" | Lägg till ett jobb till ditt CV |
|PUT | "/resume/update/:id" | Uppdatera ett jobb med angivet id|
|DELETE | "/resume/delete/:id" | Radera ett jobb med angivet id|

Ett jobb-objekt returneras och skickas som JSON med följande struktur:
```json
{
    "companyname": "Matbutik",
    "jobtitle": "Gruppchef för Frukt och Grönt",
    "location": "Stockholm"
}
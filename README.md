# Obtener correos y nombres de cursos (Juan de la cierva)

Hola, esto es un script en javascript que he hecho para obtener los nombres y correos de los participantes que aparezcan en la tabla actual del curso correspondiente (Esto es con el fin de almacenarlos de manera automatica en caso de querer hacer spam masivo a correos o cosas asi raras)

Esto gracias a **web-scrapping** mediante **fetchs** y **regex** 

de momento solamente obtiene la paginacion actual es decir: solo los primeros 20 th que hay en la tabla. Si no me da pereza lo actualizare para que obtenga todas las paginaciones


## Regex para la table
```node
/<table[^>]*id="participants"[^>]*>[\s\S]*?<\/table>/
```
## Regex para los users ID
```node
/<input\s+id="([^"]+)"/g
```
Con esto haces un for a la lista y un fetch a la url `https://aulavirtual33.educa.madrid.org/ies.juandelacierva.madrid/user/profile.php?id=`
y seteas el valor de id con el for hecho

Ya una vez hecho el fetch

buscas el nombre con la siguiente regex

```node
/<div\s+class="page-header-headings"><h1\s+class="h2">([^<]+)<\/h1><\/div>/
```

y para el regex del correo

```node
/<li\s+class="contentnode">[\s\S]*?<\/li>/
```

Y ya, eso es todo :D
(una manera de evitar este webscrapping es setear las tables con ids aleatorias mediante un script antes del que el DOM cargue)

PDS: tambien se puede filtar solamente usuarios de Profesor mediante el siguiente regex
```
<tr[^>]*id="user-index-participants-1269_r\\d+"[^>]*>.*?<td[^>]*id="user-index-participants-1269_r\\d+_c2"[^>]*>(.*?)<\/td>.*?<\/tr>`, 'i')`
```

ultima actualizacion: **24/12/2023**

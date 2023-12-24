fetch(window.location.href, {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "es-419,es;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "MoodleSessionu28020910=nlo69cecikurjmme9h5o8o7gut; MOODLEID1_u28020910=d%25E7%25E9%2582%25DF%25DB; EducaMadrid_LSSI_Cookies=2; UqZBpD3n=v1vdCGSQ__eDD",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
}).then(function (response) {
    return response.text();
}
).then(function (data) {

    var tableContent = data.match(/<table[^>]*id="participants"[^>]*>[\s\S]*?<\/table>/);
    if (tableContent) {
        console.log(tableContent[0]);

        var inputIds = data.match(/<input\s+id="([^"]+)"/g);
        var ids = inputIds.map(function (input) {
            var match = input.match(/id="([^"]+)"/);
            return match ? match[1] : null;
        });
        console.log(ids);



        ids.forEach(function (id) {
            var userId = id.replace("user", "");
            fetch(`https://aulavirtual33.educa.madrid.org/ies.juandelacierva.madrid/user/profile.php?id=${userId}`, {
                "headers": {
                    "cookie": "MoodleSessionu28020910=nlo69cecikurjmme9h5o8o7gut; MOODLEID1_u28020910=d%25E7%25E9%2581%25DF%25DB; EducaMadrid_LSSI_Cookies=2; UqZBpD3n=v1vdCGSQ__eDD",

                },
                "body": null,
                "method": "GET"
            }).then(function (response) {
                return response.text();
            }).then(function (profileData) {

                var nameMatch = profileData.match(/<div\s+class="page-header-headings"><h1\s+class="h2">([^<]+)<\/h1><\/div>/);
                var contentNodeMatch = profileData.match(/<li\s+class="contentnode">[\s\S]*?<\/li>/);

             
              
                if (nameMatch && nameMatch[1]) {
                    var name = nameMatch[1].trim();
                    if (contentNodeMatch) {

                        var decodedContent = decodeURIComponent(contentNodeMatch[0]);
                        var div = document.createElement("div");
                        div.innerHTML = decodedContent;
                        var readableText = div.textContent || div.innerText;
    
                    }
                    console.log(`Nombre del usuario ${id}:`, name, readableText);
                } else {
                    console.log(`No se encontró el nombre para el usuario ${id}`);
                }
            }).catch(function (error) {
                console.error(`Error al obtener el perfil del usuario ${id}:`, error);
            });
        });
    } else {
        console.log("No se encontró la tabla");
    }


})

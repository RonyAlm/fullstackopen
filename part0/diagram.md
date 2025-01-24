sequenceDiagram
participant browser
participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: JS document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "sedf", "date": "2025-01-23T17:00:32.058Z" }, ... ]
    deactivate server

    #0.4 Nuevo diagrama de nota
     browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
     Content-Type: application/json
     {"content": "que onda", "date": "2025-01-23T17:00:32.058Z" }
     activate server
     server-->>browser: status code 302 No Found
     deactivate server

    #0.5: Diagrama de aplicación de una sola página
     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
     activate server
     server->>browser: HTML document
     deactivate server

     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
     activate server
     server->>browser: CSS document
     deactivate server

     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
     activate server
     server->>browser: JS document
     deactivate server

     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
     activate server
     server-->>browser: [{ "content": "que onda", "date": "2025-01-23T17:00:32.058Z" }, ... ]
     deactivate server

     #0.6: Nueva nota en diagrama de aplicación de una sola pagina
     browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
     Content-Type: application/json
     {"content": "test", "date": "2025-01-23T17:00:32.058Z" }
     activate server
     server-->>browser: status code 201 Created, Response: {"message":"note created"}
     deactivate server



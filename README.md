# Docker Compose Nodejs and Postgres example

## Run the System
We can easily run the whole with only a single command:
```bash
cd app
```

Docker will pull the Postgres image.

The db service can be run on the background with command:
```bash
docker compose up -d
```

## Stop the System
Stopping the db container is also simple with a single command:
```bash
docker compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker compose down --rmi all
```

AFter that, run ```npm i``` and ```npm run start```.

casi lo hago con sequelize :D, ahora se usar sequelize

He usado una inyección de dependencias chunga y sin tantas intefaces como me gustaría porque es como lo hago en el trabajo y me he acostumbrado a ese flujo de información, aunque para repositorios no he usado sus fundamentos porque no me hizo falta, pero de tener.

en el example.env la JWT_EXPIRATION = 86400 porque es 24h en segundos.

### Ejemplo .env
```
API_KEY = "exampleAPiKey"

DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASSWORD = "safepassword"
DB_NAME = "games"
DB_PORT = 42000

NODE_PORT = 3000
NODE_ENV = production

JWT_SECRET = 1234567890
JWT_EXPIRATION = 86400

```

sin NODE_ENV en production, la api estará disponible en el puerto 1234.

El resto de endpoints son los especificados en el ejercicio. 

Los parametros van en el body porque olvide pasarlos a params por url auqnue se requiere en la url, arreglandolo en los minutos posteriores a la entrega.

IMPORTANTE: AL HACER POST, EVITA LOS IDS, NO SON NECESARIOS Y SE IGNORARÁN, AUTOGENERANDO UNO AL TENER EL ATRIBUTO SERIAL PARA LAS PRIAMRY KEY EN ABSES DE DATOS.

POST /api/auth/register — Registrar un nuevo usuario (público)
POST /api/auth/login — Iniciar sesión y obtener un JWT (público)

GET /api/studios — Obtener todos los estudios (público)
GET /api/studios/:id — Obtener un estudio por su ID (público)
POST /api/studios — Crear un nuevo estudio (requiere autenticación)
PUT /api/studios/:id — Actualizar un estudio (requiere autenticación)
DELETE /api/studios/:id — Eliminar un estudio (requiere autenticación)
GET /api/studios/:id/games — Obtener todos los videojuegos de un estudio (JOIN, público)

GET /api/games — Obtener todos los videojuegos (incluye nombre del estudio, público)
GET /api/games/:id — Obtener un videojuego por su ID (incluye nombre del estudio, público) - no dio tiempo a incluir nombre del estudio
POST /api/games — Crear un nuevo videojuego (requiere autenticación)
PUT /api/games/:id — Actualizar un videojuego (requiere autenticación)
DELETE /api/games/:id — Eliminar un videojuego (requiere autenticación)
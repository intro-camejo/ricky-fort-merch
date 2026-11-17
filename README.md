# Ricky Fort Merch

Página **no oficial** de merch de Ricky Fort

### Requisitos

- Docker
- npm
- python

## Cómo levantar

### Backend

```bash
cd backend
docker run \
    -p 5432:5432 \
    -e POSTGRES_USER=ricky \
    -e POSTGRES_PASSWORD=comandante \
    -e POSTGRES_DB=merch \
    -v ./db/schemas.sql:/docker-entrypoint-initdb.d/01-schemas.sql \
    -v ./db/seeds.sql:/docker-entrypoint-initdb.d/02-seeds.sql \
    -v ./data:/var/lib/postgresql \
    -d \
    postgres:18
npm install  # solo la primera vez
npm run dev
# o npm run start para producción
```

### Frontend

```bash
cd frontend
python3 -m http.server
```

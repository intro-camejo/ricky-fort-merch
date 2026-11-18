# Ricky Fort Merch

Proyecto de integración de la materia Intro al desarrollo de software (cátedra Camejo).

## Cómo levantar todo

Desde la raíz del repo, copiá el archivo de ejemplo de variables de entorno (y, si querés, cambiá los valores):

```bash
cp .env.example .env
```

El archivo `.env` no se sube a git: ahí van el usuario, la contraseña y el nombre de la base.

Después, levantá la base, el backend y el frontend juntos:

```bash
docker compose up --build
```

- Front: [http://localhost:8080](http://localhost:8080) (el inicio es `index.html`; el listado de productos está en [http://localhost:8080/listado.html](http://localhost:8080/listado.html))
- Back: [http://localhost:3000](http://localhost:3000)

Si la base ya existía y cambiaste los `.sql`, no se vuelven a cargar. Para empezar de cero:

```bash
docker compose down -v
```

Eso borra el volumen con los datos, y la próxima vez se vuelven a crear las tablas y los productos iniciales.

## Alternativa: levantar el back en local

Si preferís correr el backend en tu máquina (por ejemplo, para usar `npm run dev` y que se reinicie al guardar), también necesitás el `.env` en la raíz. Después levantá solo la base:

```bash
cp .env.example .env
docker compose up db -d
```

Después, en otra terminal:

```bash
cd backend
npm install
npm run dev
```

El back queda en [http://localhost:3000](http://localhost:3000). El front lo podés abrir con Live Server, o también con `docker compose up frontend`.

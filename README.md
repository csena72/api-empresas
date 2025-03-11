# 📌 API REST en Node.js con MongoDB (Sin Framework)

Este proyecto es una API REST construida en **Node.js** sin frameworks, utilizando **MongoDB** como base de datos. Implementa una **arquitectura en capas** y soporta **tests unitarios** con Jest.

## 📁 Estructura del Proyecto

```plaintext
/src
  /config
    db.js              # Configuración de conexión a MongoDB
  /database
    seed.js           # Script para poblar la base de datos con datos fake
  /models
    empresaModel.js    # Modelo de Empresa
    transferenciaModel.js  # Modelo de Transferencia
  /routes
    empresaRoutes.js   # Rutas de la API
  /services
    empresaService.js  # Lógica de negocio
  /controllers
    empresaController.js # Controladores de la API
  server.js           # Servidor principal
/tests
  server.test.js       # Tests unitarios con Jest
Dockerfile            # Configuración para contenedor
.docker-compose.yml   # Levantar la API con MongoDB
README.md             # Documentación
package.json          # Dependencias y scripts
```

---


## 🚀 Instalación y Configuración

### Pre-requisitos 📋

_Es necesario tener intalado:_ 

_Git_ [https://git-scm.com/](https://git-scm.com/)

_Docker y docker compose_ [https://www.docker.com/](https://www.docker.com/)

_Node.js y npm_ [https://nodejs.org/es/](https://nodejs.org/es/)

### 1️⃣ **Clonar el repositorio**

```sh
git clone git@github.com:csena72/api-empresas.git
cd api-node-mongo
```

### 2️⃣ **Instalar dependencias**

```sh
npm install
```

### 3️⃣ **Configurar variables de entorno**

Copiar el archivo `.env.template` a `.env` en la raíz del proyecto:

```sh
cp .env.template .env
```

---

## 🐳 Uso con Docker

### 1️⃣ **Levantar el entorno con Docker**

```sh
docker-compose up --build
```

Esto iniciará:

- **MongoDB**
- **API REST**
- **Script de seed** que insertará datos fake en MongoDB

### 2️⃣ **Verificar la base de datos**

```sh
docker exec -it mi_mongo mongosh
use mi_base_de_datos
db.empresas.find().pretty()
db.transferencias.find().pretty()
```
### 3️⃣ **Correr el servidor**

```sh
npm start
```

---

## 🔥 Endpoints Disponibles

### 📌 1️⃣ **Obtener empresas con transferencias el último mes**

```http
GET /empresas/transferencias-recientes
```

📌 **Ejemplo de respuesta:**

```json
[
  {
    "_id": "67d0b01e5575878024045497",
    "CUIT": "12345678901",
    "RazonSocial": "Nueva Empresa",
    "transferencias": [
      {
        "fecha": "2025-03-11T10:00:00.000Z",
        "monto": 1000
      },
      {
        "fecha": "2025-03-11T10:00:00.000Z",
        "monto": 3570
      }
    ]
  },
  {
    "_id": "67d0afdc0c6025088b24686c",
    "CUIT": "63555363577",
    "RazonSocial": "Lang - Moore",
    "transferencias": [
      {
        "fecha": "2025-03-11T10:00:00.000Z",
        "monto": 205000
      },
      {
        "fecha": "2025-03-11T10:00:00.000Z",
        "monto": 37000
      }
    ]
  }
]
```

### 📌 2️⃣ **Obtener empresas adheridas el último mes**

```http
GET /empresas/adhesiones-recientes
```

📌 **Ejemplo de respuesta:**

```json
[
  {
    "CUIT": "98765432109",
    "RazonSocial": "Empresa Y",
    "FechaAdhesion": "2024-02-01"
  }
]
```

### 📌 3️⃣ **Adherir una nueva empresa**

```http
POST /empresas/adhesion
Content-Type: application/json
```

📌 **Ejemplo de Request:**

```json
{
  "CUIT": "11122233344",
  "RazonSocial": "Nueva Empresa",
  "FechaAdhesion": "2022-05-15"
}
```

📌 **Ejemplo de Respuesta:**

```json
{
  "message": "Empresa adherida"
}
```

---
## ✅ Probar los servicios
Para probar los servicios seguir los siguientes pasos:

1. Obtener empresas adheridas el último mes
```sh
curl -i -X GET \
 'http://localhost:3000/empresas/adhesiones-recientes'
```

2. Consultar el servicio que trae las ultimas transeferencias
```sh
curl -i -X GET \
 'http://localhost:3000/empresas/transferencias-recientes'
```

3. Adherir una nueva empresa
```sh
curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{
    "CUIT": "12345678901",
    "RazonSocial": "Nueva Empresa",
    "FechaAdhesion": "2022-05-15"
}
' \
 'http://localhost:3000/empresas/adhesion'
```
4. Obtener empresas adheridas el último mes
```sh
curl -i -X GET \
 'http://localhost:3000/empresas/adhesiones-recientes'
```
5. Agregar transferencias a la empresa recién agregada desde la consola de mongo:
```sh

db.transferencias.insertOne({
    id_empresa: ObjectId("67d0c0cbd14abe16d59d8bec"), // Id de la empresa nueva
    fecha: ISODate("2025-03-11T10:00:00.000Z"), // Una fecha dentro del último mes
    monto: 37000 // monto de la transferencia
});
```
6. Consultar el servicio que trae las ultimas transeferencias
```sh
curl -i -X GET \
 'http://localhost:3000/empresas/transferencias-recientes'
```

## ✅ Tests Unitarios

Los tests utilizan **Jest** y **MongoDB en memoria**.

### 🔹 **Ejecutar los tests**

```sh
npm test
```

📌 **Ejemplo de salida:**

```plaintext
PASS  tests/server.test.js
✓ Debe adherir una empresa (100ms)
...
```

---

## ⚙️ Tecnologías Utilizadas

✅ **Node.js** – Sin frameworks para mayor control.
✅ **MongoDB** – Base de datos NoSQL.
✅ **Docker** – Para entorno de desarrollo.
✅ **Jest** – Para testing.
✅ **MongoMemoryServer** – Para tests en memoria.
✅ **Faker.js** – Para generar datos fake.

---

## ✨ Autor

📌 **Cristian Sena**
📌 **GitHub:** [@csena72](https://github.com/csena72)  
📌 **Email:** cristianjsena@google.com

🚀 ¡Gracias! 🎉

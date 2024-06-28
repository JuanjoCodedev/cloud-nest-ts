# 🌩️ cloud-nest-ts Module

Este módulo proporciona funcionalidades para integrar la carga de archivos a Cloudinary en aplicaciones NestJs mediante decoradores y servicios.

## 🚀 Instalación

Para instalar el módulo, ejecuta el siguiente comando en tu terminal:

```bash
npm install cloud-nest-ts
```

## ⚙️ Configuración

Antes de usar el módulo, asegúrate de configurar las credenciales de Cloudinary en tu entorno de desarrollo. Debes añadir estas variables de entorno en un archivo **.dev.env** en la raíz de tu proyecto:

```bash
MULTER_DEST=name_of_the_local
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

### Observación

La variable de entorno **MULTER_DEST** es la encarada de guardar los archivos de manera local en tu proyecto, debes establecer la ruta y llamarla como gustes, ejemplo: 

```env
MULTER_DEST=./assets/files
```

### 📦 Módulo

Importa el módulo CloudDevModule en tu aplicación NestJs para comenzar a utilizarlo:

```typescript
import { Module } from '@nestjs/common';
import { CloudDevModule } from 'cloud-nest-ts';

@Module({
  imports: [CloudDevModule],
})
export class AppModule {}
```

### 🎛️ FileDecorator

El decorador **FileDecorator** simplifica la carga de archivos utilizando Multer y **@nestjs/platform-express**, configurando automáticamente el almacenamiento en disco y la intercepción del archivo.

**FileDecorator** acepta dos parámetros:

El primero especifica el nombre del campo del formulario que contiene el archivo a cargar. Cuando se utiliza **FileDecorator("file", ...)**, NestJS busca un archivo en el cuerpo de la solicitud HTTP asociado con el campo 'file'.

El segundo parámetro indica la ruta del directorio donde se guardarán los archivos cargados mediante Multer. En el ejemplo siguiente, Multer almacenará los archivos en el directorio **'./uploads'**, relativo al directorio de ejecución de la aplicación Node.js.

### 📂 Uso en un Controlador

Importa **FileDecorator()** en tu controlador y úsalo para manejar la carga de archivos:

```typescript
import { Controller, Post, UploadedFile } from '@nestjs/common';
import { FileDecorator } from 'cloud-nest-ts';

@Controller('files')
export class FilesController {
  constructor(private readonly service: MyService) {}

  @Post('upload')
  @FileDecorator('file', './uploads')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadFile(file);
  }
}
```

### 🌐 Método uploadCloud

El método **uploadCloud()** del servicio CloudDevService permite subir un archivo a Cloudinary según los parámetros especificados.

**Parámetros:**

- 📄 **file:** El archivo a cargar. Este parámetro es obligatorio.
- 📁 **folder:** La carpeta en Cloudinary donde se almacenará el archivo. Este parámetro es obligatorio.
- 🔧 **resourceType:** Tipo de recurso ("image", "video", "raw", "auto"). Este parámetro es obligatorio.
- 📝 **format:** Formato del archivo (por ejemplo, "jpg", "mp4", "pdf"). Este parámetro es obligatorio.
- 🗑️ **deleteLocalFile:** Elimina el archivo local después de cargarlo en Cloudinary (true o false), Este parámetro es opcional.

```typescript
import { Injectable } from '@nestjs/common';
import { CloudDevService } from 'cloud-nest-ts';

@Injectable()
export class MyService {
  constructor(private readonly cloudDevService: CloudDevService) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      const result = await this.cloudDevService.uploadCloud(file, {
        cloudFolder: 'prueba',
        cloudResourceType: 'image',
        cloudFormat: 'jpg',
        cloudRadius: "max",
        cloudDreleteLocalFile: true,
      });
      return { success: true, file: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

### 📄 Metadatos

#### ✂️ Tipos de Recorte (cloudCropType) soportados por Cloudinary.

- `scale`: Escala la imagen para que quepa dentro de los límites especificados.
- `fit`: Ajusta la imagen dentro de los límites especificados sin distorsionarla.
- `limit`: Similar a `fit`, pero no agranda la imagen si es más pequeña que los límites.
- `mfit`: Similar a `fit`, pero trata de mantener la relación de aspecto original.
- `fill`: Rellena el área especificada y recorta la imagen para ajustarse completamente.
- `pad`: Rellena el área especificada y agrega un fondo si la imagen no llena el espacio.
- `lpad`: Rellena el área especificada solo en el lado derecho e izquierdo.
- `mpad`: Similar a `pad`, pero trata de mantener la relación de aspecto original.
- `crop`: Recorta la imagen para ajustarse exactamente a los límites especificados.
- `thumb`: Recorta y escala la imagen para generar miniaturas.

#### 📍 Tipos de Gravedad (cloudGravity) soportados por Cloudinary para el posicionamiento de la imagen.

- `north`: Arriba.
- `north_east`: Arriba a la derecha.
- `north_west`: Arriba a la izquierda.
- `south`: Abajo.
- `south_east`: Abajo a la derecha.
- `south_west`: Abajo a la izquierda.
- `east`: Derecha.
- `west`: Izquierda.
- `center`: Centro.
- `face`: Centrado en el rostro detectado (solo para imágenes).
- `faces`: Centrado en los rostros detectados (solo para imágenes).

#### ✨ Tipos de Efectos (cloudEffect) soportados por Cloudinary para modificar imágenes.

- `sepia`: Aplica un filtro sepia a la imagen.
- `grayscale`: Convierte la imagen a escala de grises.
- `blackwhite`: Convierte la imagen a blanco y negro.
- `sharpen`: Aumenta la nitidez de la imagen.
- `blur`: Aplica un efecto de desenfoque a la imagen.
- `oil_paint`: Simula un efecto de pintura al óleo en la imagen.
- `pixelate`: Aplica un efecto de pixelado a la imagen.
- `vignette`: Aplica un efecto de viñeta a la imagen.
- `brightness_contrast`: Ajusta el brillo y el contraste de la imagen.
- `auto_brightness`: Ajusta automáticamente el brillo de la imagen.
- `auto_color`: Ajusta automáticamente el color de la imagen.
- `auto_contrast`: Ajusta automáticamente el contraste de la imagen.
- `improve`: Mejora automáticamente la calidad de la imagen.

## 🤝 Contribución

1. Haz un fork del repositorio.

2. Crea una nueva rama:

```bash
git checkout -b feature/nueva-caracteristica
```

3. Realiza tus cambios y haz commit:

```bash
git commit -am 'Añadir nueva característica'
```

4. Empuja tus cambios a la rama:

```bash
git push origin feature/nueva-caracteristica
```

5. Abre un Pull Request en GitHub, describiendo los cambios propuestos.

## 🔑 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

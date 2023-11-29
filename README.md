# Librerias a utilizar en este proyecto

En vez de utilizar el clásico LINTER, en esta ocasion utilizaremos BIOME, quienes continuan con el legado de ROME (ya sin soporte).

Instalamos el BIOME:
```
npm install --save-dev --save-exact @biomejs/biome
```

Luego ejecutamos el siguiente comando:

```
npx @biomejs/biome init
```
Al ejecutar este ultimo comando, nos crea un nuevo archivo en nuestro proyecto, que se llama "biome.json".

```
{
	"$schema": "https://biomejs.dev/schemas/1.4.0/schema.json",
	"organizeImports": {
		"enabled": true
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true
		}
	},
	"formatter": {
		"enabled": true
	}
}
```
En ese archivo agregamos el "formatter" y lo pusimos en TRUE.

Podemos configurar muchos mas aspectos que deseamos automatizar en nuestro codigo.

## Configuraciones del Area de trabajo

Para evitar conflictos entre las configuraciones que dispongamos en el editor de codigos, podemos crear una carpeta ".vscode", que contenga el archivo "settings.json". Esta configuracion solo funcionará en este proyecto.

**settings.json**

```
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.biome": true,
        "source.organizeImports": true 
    },
    "[javascript]": {
        "editor.defaultFormatter": "biomejs.biome"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "biomejs.biome"
    },
    "[typescript]": {
        "editor.defaultFormatter": "biomejs.biome"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "biomejs.biome"
    }
}
```

En el "formatOnSave", lo que hará es formatear el codigo cuando guardemos los cambios. Y todo los errores del codigo se arreglen con el BIOME.

Por ultimo, especificamos en cuales lenguajes de programacion vamos a utilizar BIOME.

## TREMOR

https://www.tremor.so/

Es un pack de componentes para dar mejores estilos a los CHARTS, FORMS, DASHBOARDS, etc.
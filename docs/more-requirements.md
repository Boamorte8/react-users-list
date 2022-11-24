# Ampliación de requisitos

## Resumen

Después de haber completado con éxito las dos primeras versiones de la aplicación, se ha realizado un test con usuarios, del que se han extraído las siguientes conclusiones:

- El listado de usuarios únicamente con nombre/username provoca confusión. Es necesario identificar a los mismos de una forma más visual.
- Se ha detectado mucha confusión a la hora de realizar operaciones de inserción, edición y borrado de usuarios, debido a que la aplicación no muestra ningún tipo de aviso al usuario. Es necesario un sistema de alertas/notificaciones.

Tras ello, se procederá a realizar un evolutivo sobre la aplicación, para corregir dichos problemas ampliando/modificando la funcionalidad existente, según los requisitos expuestos en este documento.
Requisitos adicionales

En este apartado se detallan requisitos adicionales a añadir en la tercera versión de la aplicación, que se suman a todos los anteriores. Durante estos requisitos, se hablará de:

- Usuario: Persona que utiliza la aplicación.
- Elemento: Usuario que forma parte del sistema, y que se verá reflejado en la tabla.

## Nuevos requisitos funcionales

A continuación, se detallan los nuevos requisitos funcionales para esta versión:

- Cada elemento deberá contar con un nuevo campo “Foto”, que permita añadir una imagen asociada al mismo.
  - Los elementos contarán con una imagen por defecto, en el momento de su creación, que será la misma para todos ellos.
  - Una vez creados, será posible modificar la imagen asociada.
  - Una vez asignada una nueva imagen, no será posible recuperar la imagen por defecto, sino que únicamente podrá sobreescribirse por otra imagen nueva.
- La aplicación deberá contar con un sistema de notificaciones que informe al usuario cuando se produzca un hecho relevante. Se considerarán hechos relevantes:

  - La creación de un nuevo elemento

  - La edición de cualquier campo de un elemento

  - El borrado de un elemento

  - Los posibles errores producidos ante cualquiera de las operaciones anteriores

  - El posible error durante la carga de usuarios

## Nuevos requisitos no funcionales

A continuación, se detallan los nuevos requisitos no funcionales para esta versión:

- Las imágenes asociadas a los usuarios deberán ser en formato JPG/PNG, con un tamaño no superior a 100Kb.

# Documento de requisitos

## Resumen

El desarrollo consistirá en la creación de un gestor de usuarios para una plataforma de elearning.

Los usuarios se presentarán en formato de tabla paginada, que permitirá realizar un filtrado de los mismos, así como realizar las operaciones básicas de creación, edición y borrado de usuarios.

El objetivo del desarrollo será la presentación y validación de la idea de forma privada, no siendo relevantes aspectos como la autenticación o gestión de roles/permisos.

El proyecto inicial, se dividirá en dos fases:

- Fase 1: Entrega de un prototipo inicial con la funcionalidad mínima requerida.
- Fase 2: Ampliación del prototipo inicial, con nuevas funcionalidades complementarias a las anteriores.

En caso de validar la idea, se pretende iterar sobre este desarrollo, para añadir mejoras progresivas.
Definición de entidades

El sistema manejará una única entidad "Usuario", compuesta por los siguientes campos:

- Username: Nombre de usuario.
  - Podrá contener únicamente letras minúsculas y números.
  - No se admitirán acentos.
  - No podrá empezar por un número.
  - No podrán existir dos usuarios con el mismo username.
  - Su longitud deberá estar comprendida entre 6 y 15 caracteres.
- Nombre: El nombre y apellidos del usuario
  - Podrá contener letras mayúsculas y minúsculas, espacios y guiones.
  - Se admiten acentos.
  - Ninguna palabra podrá empezar, ni terminar, por un guión.
  - No podrá contener múltiples espacios, ni guiones, de forma consecutiva.
  - Su longitud deberá estar comprendida entre 2 y 30 caracteres.
- Rol: El rol del usuario.
  - Un único rol por usuario.
  - Los roles disponibles serán "Profesor", "Alumno" u "Otro".
- Activo: El estado de activación del usuario.
  - Los valores posibles son "Activo" o "Inactivo".

## Requisitos

A continuación, se detallan los requisitos funcionales y no funcionales de la primera versión funcional de la aplicación.

Durante estos requisitos, se hablará de:

- Usuario: Persona que utiliza la aplicación.
- Elemento: Usuario que forma parte del sistema, y que se verá reflejado en la tabla.

### Requisitos funcionales

- Los elementos se presentarán al usuario en formato tabla.
- El usuario podrá filtrar los elementos en base a los siguientes criterios:
  - Filtro por nombre: Texto libre que permita mostrar sólo aquellos elementos cuyo "Nombre" contenga el término de búsqueda, en cualquier posición. Este filtro no será sensible a mayúsculas y minúsculas, pero sí a acentos.
  - Filtro por activos: Filtro para mostrar únicamente los elementos activos.
- El usuario podrá ordenar los elementos en base a los siguientes criterios:
  - Por defecto: El orden de creación de los elementos.
  - Por nombre, alfabético ascendente: Ordenados alfabéticamente, de forma ascendente (a-z), por su nombre.
  - Por rol: Ordenados por su rol. Primero “Profesor”, después “Alumno” y en último lugar “Otro”.
  - Por activación: Por su estado de activación, primero activos y posteriormente inactivos.
- El usuario no podrá utilizar simultáneamente el filtro de elementos activos y el orden por activación.
  - En caso de estar marcado previamente el filtro de elementos activos, no será posible ordenar los elementos por activación.
  - En caso de estar ordenados previamente por activación, al marcar el filtro de elementos activos se recuperará el orden por defecto y dicha opción de ordenado no estará disponible.
- La tabla de elementos se presentará al usuario en formato paginado.
  - El tamaño por defecto de la página será de 6 elementos / página
  - El usuario podrá modificar este tamaño entre tres posibles valores, 4, 6 y 8 elementos / página
  - La navegación entre páginas deberá ser consecutiva, pudiendo avanzar únicamente a la página siguiente / anterior si las hubiera.
- El usuario podrá añadir nuevos elementos a la tabla, mediante un formulario:
  - Los campos "Username" y "Nombre" estarán inicialmente vacíos.
  - El campo de "Activo" estará marcado inicialmente como "Inactivo", y podrá ser modificado.
  - El campo de "Rol" estará marcado inicialmente como "Profesor" y podrá ser modificado.
  - Los campos del formulario deberán ser previamente validados, antes de proceder a su envío.
- El usuario podrá editar los datos de cualquier elemento de la tabla, mediante un formulario:
  - El formulario contendrá precargados los datos actuales del elemento que se está editando.
  - Los campos del formulario deberán ser previamente validados, antes de proceder a su envío.
- El usuario podrá eliminar cualquier elemento de la tabla:
  - El elemento se eliminará de forma definitiva.
  - Antes de eliminar un elemento, se solicitará una confirmación al usuario.

### Requisitos no funcionales

- La aplicación deberá ser realizada utilizando React, con las siguientes limitaciones:
  - Versión: 17 o superior.
  - Hooks permitidos: useState, useEffect y useContext.
  - Framework a utilizar: Vite
  - No se permite el uso de librerías de componentes de terceros, tales como Formik, React-Hook-Form, MaterialUI o NextUI.
- La aplicación debe ser compatible con los navegadores modernos Chrome, Firefox y Safari.
- Respecto a la persistencia y acceso a datos:
  - Todos los datos deberán ser persistidos en un único archivo JSON.
  - Dicho archivo deberá ser consultado y modificado a través de una API, generada utilizando el paquete json-server, disponible en los principales gestores de paquetes NPM y YARN.
  - El servidor creado con json-server deberá permanecer a la escucha en el puerto 4000.
  - No se permite el uso de librerías de terceros como Axios. Todas las llamadas a la API deberán ser gestionadas utilizando la herramienta nativa fetch.
  - La API únicamente deberá utilizarse para recuperar los datos de los elementos y para persistir los nuevos cambios, pero no para realizar el filtrado. El servidor debe devolver los datos de todos los elementos y el filtrado debe realizarse en cliente.
- Respecto al apartado visual:
  - Se proporcionará un documento de diseño, así como todos los recursos necesarios para su implementación.
  - Los aspectos meramente visuales, tales como colores, tipografías, sombras... son meramente orientativos. Se permite su libre modificación.
  - La aplicación únicamente contará con una versión desktop, no siendo necesaria su implementación en formato responsive.
- Respecto a CSS:
  - Toda la implementación de CSS deberá ser realizada de forma nativa, utilizando CSS o SCSS.
  - Se permite el uso de CSS/SCSS modules.
  - No se permite el uso de librerías de CSS de terceros, tales como Bootstrap o Tailwind.
  - No se permite el uso de librerías de CSS-in-JS de terceros, tales como Styled-Components.

## Requisitos adicionales

En este apartado se detallan requisitos adicionales a añadir en una segunda versión, después de haber entregado la primera versión funcional con todos los requisitos anteriores.

### Nuevos requisitos funcionales

- El usuario podrá elegir el formato de presentación de los elementos de la tabla, entre las filas anteriormente descritas y un formato basado en cards.

### Nuevos requisitos no funcionales

- Las tareas de filtrado, ordenado y paginación de elementos se deberá realizar directamente en el servidor, utilizando la API, en lugar de realizarse en cliente.

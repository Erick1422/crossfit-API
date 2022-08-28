# Best practices al contruir un REST API

## 1. Versioning
Como en cualquier otra aplicación habrán mejoras, nuevas features, etc, por lo que es bueno tener versiones, de esta manera el cliente puede seguir usando una version distinta a la que se está trabajando. (En este caso se manejan controladores y servicios globalmente, sin embargo, cuando la version cambia bastante, es aconsejable tener esos métodos en su respectiva version/carpeta).

    #Version 1
    "/api/v1/workouts"
    #version 2
    "/api/v2/workouts"

## 2. Name resources in plural
De esta forma las personas que usaran el API, tendrán mayor entendimiento respecto a lo que hace un endpoint con solo leerlo.
    
## 3. Accept and respond with data in JSON format
Se ha vuelto un estandar, por lo que el API debería recibir y enviar JSON.

## 4. Respond with standard HTTP Error Codes
Al usar nuestra API alguien externo, podría encontrarse con algún tipo de error, depende de nosotros enviar mensajes y códigos Http descriptivos. De esta manera, el hacer debugging no se vuelve una tarea ardua.

## 5. Avoid verbs in endpoint names
Al tener muchos endpoints se vuelve confuso y la documentación se volvería un dolor de cabeza. Además el mismo verbo HTTP nos dice que acción realiza ese endpoint.

    #Current implementations (without verbs)
    GET "/api/v1/workouts"
    GET "/api/v1/workouts/:workoutId"
    POST "/api/v1/workouts"
    PATCH "/api/v1/workouts/:workoutId"
    DELETE "/api/v1/workouts/:workoutId"

    #Implementation using verbs
    GET "/api/v1/getAllWorkouts"
    GET "/api/v1/getWorkoutById/:workoutId"
    CREATE "/api/v1/createWorkout"
    PATCH "/api/v1/updateWorkout/:workoutId"
    DELETE "/api/v1/deleteWorkout/:workoutId"
    
## 6. Group associated resources together (logical nesting)
Al diseñar un API, habrán casos en los que recursos estén asociados con otros, es una buena práctica agruparlos en un solo endpoint y anidarlos correctamente. Por ejemplo: En un gimnasio de crossFit, podría haber miembros, y estos miembros tendrían grabaciones de los ejercios (tiempos y repeteciones).

    #The URI for that endpoint will be
    /api/v1/workouts/:workoutId/records.

En la ruta de arriba, /workouts, /workouts/:workoutId y /workouts/:workoutId/records listan data diferente. Teóricamente se pueden anidar las veces que se quiera, pero lo recomendable es hacerlo hasta 3 veces.

## 7. Integrate filtering, sorting and pagination
Otro punto clave en el que debemos trabajar al desarrollar una API es el rendimiento, por lo que, las acciones de filtrar, ordenar y paginar son esenciales. De no implementarse, al hacer una consulta con más de 200 resgistros el tiempo de respuesta puede llegar a ser lento, o nuestro sistema podría colapsar.

## 8. Use data caching for performance improvements.
Usar un data cache es una gran práctica para mejorar la experiencia y rendimiento de nuestra API. Usualmente se usa en casos donde existen muchas solicitudes a un solo lado y la respuesta toma tiempo en completarse.

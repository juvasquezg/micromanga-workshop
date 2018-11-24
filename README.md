# Microservices

Es una estilo de arquitectura que estructura una aplicación como una colección de servivicios  de bajo acoplamiento, los cuales implementan capacidades de negocio. Hailita la entrega y despliegue continio de largas y aplicaciones complejas.

Chris Richardson

Los mircorservices permiten debido a que son independientes y pequeños permiten que se pueda desplegar más rapido y automatizar más rápido.

**San Nuemann**

- Los microservicios son servicios

- Modela las capacidades del negocio

Cultura de la automatización: debe ser importante, si lo hago manual se entorpece el caminoq ue quiero llevar.

Alta obervabilidad: Que se pueda observar a fallas, se deben observar mucho, entre los mismos micreservices se deben poder observar.

Oculto detalles de implementación: Que se maneje reservado.

Descentralizo todas las cosas: autonomas, la independencia


Aislar la falla: se aisla una falla para que si falló solo falla un servivico, pero no fallo todo el sistema.

Se pueden desplegar en cualquier omoento, si pedir permiso a alguien, es autonomo.

Maximice la necesidad de coordinar menos.

La capacidad de usted ser independiente, lo impotante es la capacidad independiente del despliegue y de su objetivo.

Ventajas:

La entrega rápida de las necesidades del negocio, se realiza una entrega rápida. La complejudad accidental, llevar una implementación de microservicios, que no nos pase que los, si nos estpa retrasando la antrega de funcionalidades pues pare, porque vas por el camino que no es.


Transacciones muy alto, yo puedo escalar un solo servicio, no solo escalar toda la aplicacióon monolita.

Tolerancia a fallos, debe seguir operando el todo el sistemam

Fácil experimentación, probar framwork, me fuciona para mi necesidad lo hago.

La imagen no es suficiente, los microservicios tienen esa capacidad accidental,
por eso eso va más allá de eso. cómo garantizo un microservicio bien un sistema distribuido.

Request driven y Event Driven son métodos para comucicacón entre los microservicios.


Teoría de promesas.

Autonomia

libertad desde un control externo o influencia independiente.

# Estrategias de implementación

# 1. ¿Nwcesito realmete micrsoervicios?

## Puntos Positivos

- Productos grandes puedan estar contatemente mejorando uy agregar valor al usaurio final.

## Retos Nuevos

A nivel de depliegue, a nivel de monitorip implica que vas a tener probelmas que con Monolitico no tenías.

## Se debe

1. Debemos alinear una estructura organizacional

## Ley de Conway

Altamente consientes de que si nos vamos por microservicios que se tienen ventajas y desventajas.

# Despliegue

Un conocimiento de Continous Delivery y continous Deployment

## Puntos claves

Se puede Programar en un lenguaje especifico, el que mejor se adapte a lo que necesitas, puedes usar javascript, puedes usar python, ruby...

## Stack de tencnologia

## Manejar repositirios?

### Monorepo

Se gana en cohesion, reusar componentes que son reusables
Tiene mas sentido para el entorno de desarrollo

O multirepositorio independientes?

### Se gana que cada repo tiene un tamaño mas controlado
Pipilines

## Aproximación iterativa

### Stranger pattern

Es útil para migrar de una arquitectura monolítica a una arquitectura
orientada a **microservicios**. Consta de:

- Poner un API Gateway
- Poner la aplicación monolítica.
- Poner un microservicio al lado de la aplicación monolítica Legacy.

Lo anterrior se conoce como **aproximación iterativa**.


## API Gateway

Se encarga de enrutar la petición a el **servicio** monolítico Legacy
o a el **microservicio** que está orientado a la nueva arquitectura.

Comience con microservicios simples, para entrenar a tu equipo.

Rompa dependecias con el monolito

Priorice la aseparación basado en las ventajas para el negocio

Mantenga un balance refactor y rewrite. Cuando hago refactor y cuando hago rewrite

### Estilos arquitectonicos asociados

Persitencia políglota

Conbinar Mongo (no transanccional y shemaless), Redis (cahche) o SQL (transacionalidad y evitar duplicidad)

### Data Lakes

### Multicloud

Elegir entre nubbes

Amazon es una emplesa agresiva que te captura, no tiene la flexibilidad.

Microsoft Azure, manejo de proteción de datos

Google tiene una escalabilidad absolutamente alta.

Tipo Platform as a Service por ejemplo CloudFlaware

De acuerdo a las capacidades del negocio.

Politicas de AutoScaling, de acuerdo a ciertos parametros subir o bajar las capacidades del sistema

Machine learning para poder ahorrar, porque si no lo manejas de
manera adecuada te atrapa en dinero o en desorden.


## Microservices

Los microservicios corren independientes (autonomos) y están en la carpeta
**micromanga-workshop/src/services/auth/**

Los microservicios son 2:

```
login
register
```

Se corren con los siguientes comandos

```
npm start src/services/auth/login.js -- --listen tcp://localhost:3001
npm start src/services/auth/register.js -- --listen tcp://localhost:3002
```

### API Gateway

El AI Gateway es un inermediarío (entrypoint) de cara al cliente,
Si un cliente requiere el microservicio de login, le pega
al API gateway, el api gateway le pregunta al **Service Discovery**
que es **Consul** (en este caso) y es el que sabe dónde están los microservicios.

### Service Discovery

Se usa https://www.consul.io/downloads.html

Consul es el encargado de ubicar los microservicios.

```
consul agent -dev
```


Cada servicio debe loguearse con Consul, porque Consul
debe saber donde está cada microservicio

El **API gateway** lo que hace es consultar Consul, porque Consul
sabe dónde está por ejemplo el auth

### en que puerto corre consul

Consul en el puerto 8500. La interfaz de Consul se puede ver en el navegador en la ruta http://localhost:8500

### Correr el microservicio

Para correr el microservicio se ejecuta

```
npm start ./src/gateway.js
```

## Reto

Implementar todas las mejoras que veas posibles a la aplicacion
en un lapso de 3 dias. PSL revisara las soluciones enviadas y las 5 mejores

Algunas ideas

Despliegue
Elegancia del diseño y la implementacion
Orienta a calidad
otras que se te ocurran


Pueden hacerlo como un pull request

### Para implementar el microservicio en Nodejs

- Se utiliza la librería **micro**
- Se utiliza la librería consul de nodejs
- Se utiliza la funcionalidad asyc/await
- se implementa similar los microservicios login y register

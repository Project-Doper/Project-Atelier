# Project Atelier

### Overview
Back-end implementation to interact with front-end application to handle all API requests. Utilizes three
AWS EC2 instances to hold a PostgreSQL database in one instance and servers to handle the API requests in
two instances. Servers are load balanced using NGINX's round-robin load balancer.

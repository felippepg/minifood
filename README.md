# 🍔 Minifood (em construção) 🚧

> Um sistema de pedidos de comida com arquitetura baseada em microsserviços, inspirado no iFood, para fins de estudo e evolução profissional.

---

## 🔥 Sobre o projeto

Este é um projeto pessoal criado com o objetivo de praticar:

- Arquitetura de Microsserviços
- Mensageria com RabbitMQ
- Comunicação assíncrona com filas
- Containers com Docker e orquestração com Kubernetes (futuramente)
- Padrões de design e boas práticas com Java, Spring Boot, Typescript, Python e React
- Simulações realistas de fluxo de pedidos, pagamento e preparo

---

## 🧩 Estrutura dos Microsserviços

- **client-service** → cadastro e ações do usuário
- **restaurant-service** → restaurantes e pratos
- **order-service** → processamento de pedidos
- **payment-service** → simulação de pagamentos
- **kitchen-service** → gerenciamento da cozinha
- **frontend** → interface React para clientes

---

## 🐳 Docker

O projeto será orquestrado via `docker-compose` para facilitar a subida local de todos os serviços e infraestrutura (RabbitMQ, PostgreSQL, etc).

---

## 📦 Tecnologias

- Java 21 + Spring Boot + Python
- TypeScript + React
- Docker & Docker Compose
- RabbitMQ
- PostgreSQL
- WSL (Windows Subsystem for Linux)

---

## 🚧 Status

Este projeto está em desenvolvimento. Mais serviços, docs e integrações serão adicionados progressivamente.

---

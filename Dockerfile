FROM nginx:latest AS base
WORKDIR /app
EXPOSE 5000

FROM node:8 AS build
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

FROM base AS final
LABEL RHStock.Web.Vue 1.0.1
WORKDIR /app
COPY --from=publish /src/dist .

#ENTRYPOINT ["nginx", "RHStock.WebApi.dll"]
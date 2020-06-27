FROM node:12-slim

RUN mkdir /opt/app
WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM elixir:1.10.3

WORKDIR /opt/app

COPY . .

WORKDIR /opt/app/server

ARG APP_NAME=drawit
ARG APP_VSN=0.1.0
ARG MIX_ENV=prod

ENV MIX_ENV=${MIX_ENV} \
    APP_NAME=${APP_NAME} \
    APP_VSN=${APP_VSN}

RUN mix local.rebar --force
RUN mix local.hex --if-missing --force
RUN mix deps.get
RUN mix compile
RUN mix distillery.release --verbose && \
  mkdir -p /opt/built && \
  cp _build/${MIX_ENV}/rel/${APP_NAME}/releases/${APP_VSN}/${APP_NAME}.tar.gz /opt/built && \
  cd /opt/built && \
  tar -xzf ${APP_NAME}.tar.gz && \
  rm ${APP_NAME}.tar.gz

RUN useradd -d /home/drawit -m -s /bin/bash drawit
RUN chown -R drawit:drawit /opt/built
USER drawit

CMD trap 'exit' INT; /opt/built/${APP_NAME} foreground

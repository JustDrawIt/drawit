FROM node:12-slim as client_build

RUN mkdir /opt/app
WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY webpack.config.js .babelrc  ./
COPY client ./client
COPY locales ./locales

RUN npm run build

FROM elixir:1.10.3 as server_build

COPY --from=client_build /opt/app /opt/app

WORKDIR /opt/app/server

COPY server/ ./

ARG APP_NAME=drawit
ARG APP_VSN=
ARG MIX_ENV=prod

ENV MIX_ENV=${MIX_ENV} \
    APP_NAME=${APP_NAME} \
    APP_VSN=${APP_VSN}

RUN mix do local.rebar --force, local.hex --if-missing --force
RUN mix do deps.get --only $MIX_ENV, deps.compile
RUN mix distillery.release --verbose && \
  cd _build/${MIX_ENV}/rel/$APP_NAME/releases/$APP_VSN && \
  tar -xzf $APP_NAME.tar.gz && \
  rm $APP_NAME.tar.gz

WORKDIR /opt/app

RUN useradd -d /home/drawit -m -s /bin/bash drawit
RUN chown -R drawit:drawit /opt/app/server
USER drawit

CMD trap 'exit' INT; server/_build/$MIX_ENV/rel/$APP_NAME/releases/$APP_VSN/bin/$APP_NAME foreground

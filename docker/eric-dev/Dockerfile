FROM dictybase/frontend-builder:ericdev
LABEL maintainer "Eric Hartline <eric.hartline@northwestern.edu>"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy only necessary files
COPY package.json ./
COPY yarn.lock ./
COPY jsconfig.json ./

RUN yarn install

# add necessary folders
ADD src src
ADD public public

# overwrite the client key file
ADD $CLIENT_KEYS /usr/src/app/src/utils/clientConfig.js

RUN yarn build

FROM dictybase/static-server:2.0.0
RUN mkdir /www
WORKDIR /www
COPY --from=0 /usr/src/app/build ./
ENTRYPOINT ["/usr/local/bin/app", "run", "-f", "/www"]

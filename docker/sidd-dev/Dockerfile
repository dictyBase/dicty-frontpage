# It's a multi stage build https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# The first one build single file js for the web app
# The second one copies the file and server with a golang static web server
FROM dictybase/frontend-builder:devsidd
LABEL maintainer "Siddhartha Basu <siddhartha-basu@northwestern.edu>"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy only necessary files
COPY package-lock.json ./
COPY jsconfig.json ./
COPY package.json ./

RUN npm ci

# add necessary folders
ADD src src
ADD public public

# standard install/build commands
RUN npm run build

FROM dictybase/static-server:2.0.0
RUN mkdir /www
WORKDIR /www
COPY --from=0 /usr/src/app/build ./
ENTRYPOINT ["/usr/local/bin/app", "run", "-f", "/www"]

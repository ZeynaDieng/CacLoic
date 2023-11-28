FROM node:16-alpine

# Create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#update & install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy everything in the project inside current WORKDIR /usr/src/app
# make sure to add node_module to .dockerignore
COPY . ./
RUN yarn install --frozen-lockfile

# build necessary , evenif no static filesare needed,
# since it builds the server as well
RUN yarn build

# expose port 8080 on the container
EXPOSE 8080

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0

#expose 8080 on the container
ENV NUXT_PORT=8080


# start app
CMD [ "yarn", "start" ]

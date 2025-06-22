FROM denoland/deno:1.34.3

# create app directory
WORKDIR /app

# copy config and lock files
COPY import_map.json deno.json ./

# copy source code
COPY src/ src/

# expose the port your app runs on
EXPOSE 8000

# run the server
CMD ["deno", "run", "--import-map=import_map.json", "--allow-net", "--allow-read", "src/mod.ts"]

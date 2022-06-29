In linux, given that there's a local `mongo` server running:
```sh
cd db-builder-server
npm install
npm start
```

This is hacky as hell, so all the server code is in `db-builder-server/src/app.js`. To change the mongo server used, change the `url` variable in the `db-builder-server/src/index.js` file.

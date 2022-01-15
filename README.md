# Nodejs: erfan-mongo-json-backup

-   [Usage](#-usage)
-   [License](#-license)

## 📖 Getting started

`$ npm i erfan-mongo-json-backup`

This package use mongoose and mongoexport command for backup.

## Process

This package creates a folder with name like `<DATABSE_NAME>-<CURRENT_DATE_STRING>` and
stores all collections in `.json` files with their name inside the folder.

## 💻 Usage

```javascript
  const mongoBackup = require('erfan-mongo-json-backup');

  const connectionString = "<DATABASE_CONNECTION_STRING>";
  const dbOptions = {
    user: "<USERNAME>",
    pass: "<PASSWORD>",
    host: "<HOST>",
    port: 27017,
    database: "<DATABSE_NAME>",
    removeDayBeforeBackup: true,
  };

  mongoBackup(connectionString, dbOptions);
```

## 💡 Props

| Prop              | Type       | Example | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `user`       | `string`   |  `admin`  | Database Username.
| `pass`      | `string`   | `12345678` | Database Password.
| `host`      | `string`   | `localhost` | Database Host.
| `port`      | `number`   | `27017` | Database Port.
| `database`      | `string`   | `admin` | Database Name.
| `removeDayBeforeBackup`      | `boolean`   | `true`  | Removes the day before backup folder.

## 📜 License
This library is provided under the Apache License.

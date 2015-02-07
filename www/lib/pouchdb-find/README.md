PouchDB Find Plugin
=====

[![Build Status](https://travis-ci.org/nolanlawson/pouchdb-find.svg)](https://travis-ci.org/nolanlawson/pouchdb-find)

([Live demo](http://nolanlawson.github.io/pouchdb-find/))

Provides a simple, [MongoDB-inspired](https://github.com/cloudant/mango) query language that accomplishes the same thing as the [map/reduce API](http://pouchdb.com/api.html#query_database), but with far less code.

Eventually this will replace PouchDB's map/reduce API entirely. You'll still be able to use map/reduce, but it will be distributed as a separate plugin.

**Warning: this is beta software! It may change at anytime and could be unstable.**

Status
---

Implemented: `$lt`, `$gt`, `$lte`, `$gte`, `$eq`, `$exists`, `$type`, multi-field queries, multi-field indexes, multi-field sort, `'deep.fields.like.this'`, ascending and descending sort.

Not implemented yet: `$ne`, `$regex`, `$in`, `$nin`, `$and`, `$or`, `$not`, `$nor`, `$all`, `$elemMatch`, `$size`, `$mod`, `limit`, `offset`, probably a bunch of other stuff.

API
-----

This API is modeled after [the Cloudant query API](https://docs.cloudant.com/api/cloudant-query.html), soon to be merged into CouchDB 2.0. Read that page for more details.

As with PouchDB, the entire API accepts either the callback or the Promise style.

**Overview**

* [`db.createIndex(index [, callback])`](#dbcreateindexindex--callback)
* [`db.getIndexes([callback])`](#dbgetindexescallback)
* [`db.deleteIndex(index [, callback])`](#dbdeleteindexindex--callback)
* [`db.find(request [, callback])`](#dbfindrequest--callback)

### db.createIndex(index [, callback])

Create an index if it doesn't exist, or do nothing if it already exists.

Example:

```js
db.createIndex({
  name: 'myindex',
  fields: ['foo', 'bar'],
  type: 'json'
}).then(function (result) {
  // yo, a result
}).catch(function (err) {
  // ouch, an error
});
```

The result can be either:

```js
{"result": "created"}
```

or:

```js
{"result": "exists"}
```

**Options**

* `fields` is a list of fields to index
* `name` can be omitted if you don't care
* `type` only supports `'json'`, and it's also the default.

### db.getIndexes([callback])

Get a list of all the indexes you've created. Also tells you about the special `_all_docs` index, i.e. the default index on the `_id` field.

Example:

```js
db.getIndexes().then(function (result) {
  // yo, a result
}).catch(function (err) {
  // ouch, an error
});
```

Example result:

```js
{
  "indexes": [
    {
      "ddoc": null,
      "name": "_all_docs",
      "type": "special",
      "def": {
        "fields": [
          {
            "_id": "asc"
          }
        ]
      }
    },
    {
      "ddoc": "_design/idx-0f3a6f73110868266fa5c688caf8acd3",
      "name": "idx-0f3a6f73110868266fa5c688caf8acd3",
      "type": "json",
      "def": {
        "fields": [
          {
            "foo": "asc"
          },
          {
            "bar": "asc"
          }
        ]
      }
    }
  ]
}
```

### db.deleteIndex(index [, callback])

Delete an index and clean up any leftover data on the disk.

**Options**

* `index` Definition of an index to delete. You can pass it in exactly as you received it from the `getIndexes()` API. You cannot delete the built-in `_all_docs` index.

Example:

```js
db.deleteIndex({
  "ddoc": "_design/idx-0f3a6f73110868266fa5c688caf8acd3",
  "name": "idx-0f3a6f73110868266fa5c688caf8acd3",
  "type": "json",
  "def": {
    "fields": [
      {
        "foo": "asc"
      },
      {
        "bar": "asc"
      }
    ]
  }
}).then(function (result) {
  // yo, a result
}).catch(function (err) {
  // ouch, an error
});
```

Notice that you don't need to provide a `_rev`! The design doc is also deleted.

### db.find(request [, callback])

Query the API to find some documents.

Example:


```js
db.find({
  selector: {name: 'Mario'},
  fields: ['_id', 'name'],
  sort: ['name']
}).then(function (result) {
  // yo, a result
}).catch(function (err) {
  // ouch, an error
});
```

Example result:

```js
{
  "docs": [
    {
      "_id": "mario",
      "name": "Mario"
    }
  ]
}
```

**Options**;

* `selector`: Required. Defines a selector to filter the results. See the Cloudant docs for more details.
* `fields`: Optional. Defines a list of fields that you want to receive. If omitted, you get the full documents.
* `sort`: Optional. Defines a list of fields defining how you want to sort. Note that sorted fields also have to be selected in the `selector`.

If there's no index that matches your `selector`/`sort`, then this method will throw an error. This is a good thing, because it means it's pretty much impossible to write a slow query. :)

Debugging
----

Just call:

```js
PouchDB.debug.enable('pouchdb:find')
```

Then `pouchdb-find` will start logging some debug information to the console. This can be useful if, for instance, you want to see the query plan that is being used to execute your queries.

Usage
------

To use this plugin, include it after `pouchdb.js` in your HTML page:

```html
<script src="pouchdb.js"></script>
<script src="pouchdb.find.js"></script>
```

You can also download it from Bower:

```
bower install pouchdb-find
```

Or to use it in Node.js, just npm install it:

```
npm install pouchdb-find
```

And then attach it to the `PouchDB` object:

```js
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
```

How to contribute to this thing
----------

Instructions are in [CONTRIBUTING.md](https://github.com/nolanlawson/pouchdb-find/blob/master/CONTRIBUTING.md).

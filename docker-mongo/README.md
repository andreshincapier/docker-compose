#### Start from terminal.

```bash
$ docker-compose up -d
```

#### Execution

```bash
$ docker exec -it <container-name> bash
```

##### Example

```bash
$ mongo admin -u root -p rootpassword
```

##### Example

```bash
$ mongosh admin -u root -p andreshincapier
```

### Mongo shell

- Show databases:

```bash
show dbs
```

- Create new non-existant database:
```bash
use mydatabase
```
- Show collections:
```bash
show collections
```
- Show contents/documents of a collection:
```bash
db.your_collection_name.find()
```
- Save a data to a collection:
```bash
db.your_collection_name.save({"name":"Sony AK"})
```
- Show database version:
```bash
db.version()
```

## Use
Browse to  connect `mongodb://YourUsername:YourPasswordHere@127.0.0.1:27017/your-database-name`.

#### Start from terminal

```bash
docker-compose up -d
```

#### Verify image

```bash
docker ps
```

## Use

Browse to [https://github.com/qishibo/AnotherRedisDesktopManager/releases] and download

Then input host: 127.0.0.1 and port: 6379 then click on the ok button as shown in the
following screenshot.

![Configuration](https://i.imgur.com/W8Jlury.png)

Once the connection established, you will see the following screen.

![Result](https://i.imgur.com/m4KB9SR.png)

Type the following command and hit enter. It will create new key with value `welcome` with 1000 `ttl`

```Batch
 SETEX mykey 1000 "Welcome"
```

To GET the key type the following command

```Batch
 docker-compose up -d
```


for more info visit [https://onexlab-io.medium.com/docker-compose-redis-16a8ff3682b1]

to run docker:

```docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres```

to enter in docker container run:

```docker exec -it pg bash```

```psql -U root```

```\l```

```CREATE DATABASE fincheck;```
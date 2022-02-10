---
title: 간단하고 자그마한 나의 PostgreSQL 명령문들
date: 2021-02-18
cover_image_url: https://images.unsplash.com/photo-1535077516733-ad29da1026f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1398&q=80
---

<span class="photo-reference">Photo by <a href="https://unsplash.com/@davidclode?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David Clode</a> on <a href="https://unsplash.com/s/photos/baby-elephant?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

명령문을 모두 알고 있지는 않다. 하지만 개인 프로젝트를 진행하면서 가장 빈번하게 사용하게 되는 기본적인 명령어들을 정리해 보고자 한다. 물론 pgAdmin같은 GUI를 사용한다면 필요없겠지만...  
wsl2를 사용하고 있으므로 아래의 예시들은 모두 wsl2 환경에서 진행됐다. (postgresql version: 13.1)

wsl2에서 postgresql을 실행하고 psql에 들어가기.

```
> sudo service postgresql start

> sudo -u postgres psql
```

그러면 `postgres=#`로 표시되는 psql로 들어가게 된다.

## 시작하기 전에...

여기서 몇 가지 일러두자면, 대문자를 쓰는 이유는 SQL명령문임을 강조하기 위해서다. 소문자로 입력하더라고 상관이 없다. 다만 데이터베이스의 종류에 따라서는 그래도 대소문자를 구별해 주는 것이 좋다고 알고 있는데, 적어도 이 포스트 내용에 한해서는 괜찮다.  
그리고 명령어 마지막에 항상 `;`을 붙여야 한다. 이거 의외로 실수하기 쉬우니 명심하자. 세미콜론을 붙이지 않으면 명령문이 실행되지 않고 `postgres-#`로 넘어간다.

```
postgres=# SELECT CURRENT_USER (;빼먹음!)
postgres-#
```

당황하지 말고 `;`을 마저 적고 엔터를 치면 된다.

```
postgres=# SELECT CURRENT_USER (;빼먹음!)
postgres-# ;

current_user
--------------
postgres
(1 row)

postgres=#
```

## `CREATE USER 유저이름 WITH PASSWORD '암호';`

postgres는 기본적으로 존재하는 superuser다. 이 유저로 진행해도 개인 사이드 프로젝트 정도라면 별 상관이 없겠지만 그래도 새로운 유저를 등록하는 것이 좋다. 암호를 적을 때에는 작은 따옴표를 써야 된다.(`''`)

```
postgres=# CREATE USER 유저이름 WITH PASSWORD '암호';

CREATE ROLE
```

## `ALTER USER 유저이름 WITH CREATEDB;`

새로 생성된 유저로 프로젝트를 진행하기 위해서는 이 유저로 데이터베이스를 만들 수 있는 권한을 부여해 줘야 된다.

```
postgres=# ALTER USER 유저이름 WITH CREATEDB;

ALTER ROLE
```

## `\du`

이 명령어는 모든 유저들을 보여준다. 우리가 생성한 유저에게 Create DB 라고 데이터베이스를 생성할 수 있는 권한이 부여된 것을 볼 수 있다.

```
postgres=# \du

                                    List of roles
  Role name  |                         Attributes                         | Member of
-------------+------------------------------------------------------------+-----------
 postgres    | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 유저이름    | Create DB                                                  | {}
```

## `SET ROLE 유저이름;`

여기까지는 superuser인 postgres로 진행한 것이다. 이제 방금 생성한 유저로 갈아타 보자.

```
postgres=# SET ROLE 유저이름;

SET

postgres=>
```

## `SELECT CURRENT_USER;`

지금 사용 중인 유저가 어떤 유저인지 볼 수 있다. 우리가 만든 유저로 무사히 넘어왔음을 볼 수 있다.

```
postgres=> SELECT CURRENT_USER;

current_user
--------------
유저이름
(1 row)

postgres=>
```

## `CREATE DATABASE 데이터베이스이름;`

데이터베이스를 만든다.

```
postgres=> CREATE DATABASE 데이터베이스이름;

CREATE DATABASE

postgres=>
```

## `\l`

소문자 엘이다. 대문자가 L인 그 엘. 리스트(list)의 엘. 현재 postgresql의 모든 데이터베이스들을 보여준다. 우리가 만든 데이터베이스 말고도 postgres, template0, template1이 있으면 정상이다. 이것들은 건들지 말자.

```
postgres=> \l

                                List of databases
    Name         |    Owner    | Encoding | Collate |  Ctype  |   Access privileges
-----------------+-------------+----------+---------+---------+-----------------------
 데이터베이스이름| 유저이름    | UTF8     | C.UTF-8 | C.UTF-8 |
 postgres        | postgres    | UTF8     | C.UTF-8 | C.UTF-8 |
 template0       | postgres    | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
                 |             |          |         |         | postgres=CTc/postgres
 template1       | postgres    | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
                 |             |          |         |         | postgres=CTc/postgres
(4 rows)

postgres=>
```

## `\c`

우리가 만든 데이터베이스 안으로 들어가보자. 그런데 postgres로서 들어갔다고 알려준다. 위에서 했던 것처럼 SET ROLE을 사용하여 다시 우리가 만든 유저로 바꿔주자. (그냥 postgres로 진행해도 크게 상관은 없으리라 생각된다)

```
postgres=> \c 데이터베이스이름

You are now connected to database "데이터베이스이름" as user "postgres".

데이터베이스이름=# SET ROLE 유저이름;

SET

데이터베이스이름=>
```

## `\dt, \d`

`\dt`는 데이터베이스 내의 모든 테이블을 보여준다. `\d`는 테이블을 포함해서 sequence, view까지 포함해서 보여준다. 아직 아무 테이블이 없다면 Did not find any relations. 라고 뜰 것이다.

```
데이터베이스이름=> \dt

Did not find any relations.

데이터베이스이름=> \d

Did not find any relations.
```

테이블을 만드는 명령어는 다루지 않는다. 왜냐하면 쓴 적이 없다. CREATE DATABASE까지만이 우리가 여기서 해줄 일이다. Django를 쓰건 typeORM을 쓰건 테이블은 이들이 model이나 entity에 따라서 자동으로 생성할 것이다. 그래도 다루는 것이 좋지 않겠는가? 하시는 분들도 있겠지만 이 포스트 제목이 '간단하고 자그마한 나의 PostgreSQL 명령문들'이라는 것을 상기하시길...

백엔드 프로그램이 성공적으로 실행됐다면 이제 테이블들이 보일 것이다.

```
데이터베이스이름=> \dt

                         List of relations
 Schema |                Name                | Type  |    Owner
--------+------------------------------------+-------+-------------
 public | 테이블이름                          | table | 유저이름
 public | 테이블이름                          | table | 유저이름
 public | 테이블이름                          | table | 유저이름
 public | 테이블이름                          | table | 유저이름

(4 rows)

데이터베이스이름=>
```

## `SELECT * FROM 테이블이름;`

테이블 내부의 모든 데이터를 열람한다. 테이터의 양이 많을 경우 끊어서 보여주는데, 엔터키를 누르면 다음 데이터를 보여준다. 중단하고 싶다면 `q`를 누르자.

```
데이터베이스이름=> SELECT * FROM 데이터베이스이름;

 id |         createdAt          |         updatedAt          |         email
----+----------------------------+----------------------------+------------------------
  1 | 2020-12-15 16:40:04.031237 | 2020-12-15 19:55:29.938685 | typescript@gmail.com
  2 | 2020-12-15 20:44:25.582199 | 2020-12-15 20:44:25.582199 | python@gmail.com
  3 | 2021-01-04 12:29:27.786251 | 2021-01-04 12:29:27.786251 | go@gmail.com
(3 rows)

데이터베이스이름=>
```

## 테이블 이름을 user로 지었을 때

보통 유저들의 model이나 entity의 이름을 user라고 짓는데, 문제는 user는 postgresql에서도 사용하고 있다는 것이다. user라는 테이블을 만들었다고 가정하면,

```
데이터베이스이름=> SELECT * FROM user;

user
----------
유저네임
(1 row)

데이터베이스이름=>
```

내 테이블의 데이터 대신 현재 사용중인 postgresql 유저가 나온다. 그래서 나는 보통 user대신 users로 model을 정의하는 편이다. 아니면 쌍따옴표로 "user"라고 써주면 내 user테이블을 보여준다.

```
데이터베이스이름=> SELECT * FROM "user";

 id |         createdAt          |         updatedAt          |         email
----+----------------------------+----------------------------+------------------------
  1 | 2020-12-15 16:40:04.031237 | 2020-12-15 19:55:29.938685 | typescript@gmail.com
  2 | 2020-12-15 20:44:25.582199 | 2020-12-15 20:44:25.582199 | python@gmail.com
  3 | 2021-01-04 12:29:27.786251 | 2021-01-04 12:29:27.786251 | go@gmail.com
(3 rows)

데이터베이스이름=>
```

## `DELETE FROM 테이블이름 WHERE 조건;`

위의 user 테이블로 진행하겠다. 테이블 내의 row 중 조건을 충족하는 row를 삭제하는 명령이다.

```
데이터베이스이름=> DELETE FROM "user" WHERE id=3;

DELETE 1

데이터베이스이름=> SELECT * FROM "user";

 id |         createdAt          |         updatedAt          |         email
----+----------------------------+----------------------------+------------------------
  1 | 2020-12-15 16:40:04.031237 | 2020-12-15 19:55:29.938685 | typescript@gmail.com
  2 | 2020-12-15 20:44:25.582199 | 2020-12-15 20:44:25.582199 | python@gmail.com
(2 rows)

데이터베이스이름=>
```

## `DELETE FROM 테이블이름;`

테이블의 모든 row를 지운다.

```
데이터베이스이름=> DELETE FROM "user";

DELETE 2

데이터베이스이름=> SELECT * from "user";

 id | createdAt | updatedAt | email
----+-----------+-----------+-------
(0 rows)

데이터베이스이름=>
```

## `DROP DATABASE 데이터베이스이름;`

데이터베이스를 통째로 삭제한다. 주의해서 사용해야 된다. 해당 데이터베이스 내에서 삭제하는 것은 불가능하므로 다른 데이터베이스로 나가야 된다. 기본 데이터베이스인 postgres로 이동한 뒤 명령어를 실행해 보자.

```
데이터베이스이름=> \c postgres

postgres=# DROP DATABASE 데이터베이스이름;

DROP DATABASE

postgres=#

```

## 마치며

내가 자주 사용하는 PostgreSQL 명령어들을 적어봤다. 현재로서는 매우 기본적인 수준이다. typeORM 로그로 지나가는 무수한 SQL문을 언젠가는 모두 알아들을 수 있는 날이 오기를 바란다.

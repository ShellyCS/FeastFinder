# FeastFinder

mysql> select * from restauarnts;
 id     | name                   | areaName         | avgRating | restaurant_image                 | deliveryTime |
+--------+------------------------+------------------+-----------+----------------------------------+--------------+
|  23954 | Barbeque Nation        | Midtown          |      4.30 | koxmlppfprrurmmcvxp9             |           35 |
|  28408 | Chinese Wok            | Downtown         |      4.50 | e0839ff574213e6f35b3899ebf1fc597 |           30 |
| 105262 | UBQ by Barbeque Nation | Adugodi          |      3.90 | muaktnk5xb3zop4bvj6l             |           29 |
| 419319 | The Dough Therapy      | Rosevellt        |      4.90 | 8eef058c1b4d15ebfd99cc296fe6c7ea |          120 |
| 428659 | Tru Falafel            | Central Park     |      4.40 | 3656a459e0ba179e250cf25836d02134 |           90 |
| 512590 | Wow! Momo              | KORAMANGALA      |      4.30 | 64fd45fd9f44c1737bc446e470bed666 |           24 |
| 613918 | KFC                    | Times Square     |      4.00 | f01666ac73626461d7455d9c24005cd4 |           25 |
| 752903 | Chicago Pizza          | Downtown Chicago |      4.20 | 80f040545552605e33eba09f8fa30be9 |           30 |
+--------+------------------------+------------------+-----------+----------------------------------+--------------

mysql> desc restaurants;
+------------------+--------------+------+-----+---------+----------------+
| Field            | Type         | Null | Key | Default | Extra          |
+------------------+--------------+------+-----+---------+----------------+
| id               | int          | NO   | PRI | NULL    | auto_increment |
| name             | varchar(100) | YES  |     | NULL    |                |
| areaName         | varchar(100) | YES  |     | NULL    |                |
| avgRating        | decimal(3,2) | YES  |     | NULL    |                |
| restaurant_image | varchar(255) | YES  |     | NULL    |                |
| deliveryTime     | int          | YES  |     | NULL    |                |
+------------------+--------------+------+-----+---------+----------------+
+++
title = "Data Science Portfolio"
+++


## WEB SCRAPING
#### AUGUST 22, 2023

~~~

<div align="justify">
In this project, we scrape data from the beer section of the <a href = "https://www.boozy.ph">Boozy</a> website using the Beautiful Soup library in Python. Specifically, for each product in the said section, we extract the following:
<ul> <li> Name </li> <li> Price </li> <li> Star Rating </li> <li> Number of Reviews </li> </ul> 
</div>

<div align="justify">
A screenshot of the first page in the beer section of the website is shown below.
</div>

<div align="center">
<br>
<img src="/assets/BeerRow.png" align="top" width="90%">
<br>
</div>

<div align="justify">
The program for data scraping is shown in the Python file named <a href = "/assets/scraper.py">scraper</a>. In this implementation, we construct a Pandas dataframe where names are stored as string, prices and ratings as floating point numbers, and number of reviews as integers. In the following figure, we see the first five observations. Prices are in Philippines pesos while ratings are on an integer scale of 1 to 5 where 1 is the lowest and 5 is the highest. 
</div>

<br>

<table>
  <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Rating</th>
    <th>No. of Reviews</th>
  </tr>
  <tr>
    <td>Engkanto Mango Nation - Hazy IPA 330mL Bottle ...</td>
    <td>543.0</td>
    <td>5.0</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Engkanto High Hive - Honey Ale 330mL Bottle 4-...</td>
    <td>407.0</td>
    <td>4.0</td>
    <td>5.0</td>
  </tr>
  <tr>
    <td>Engkanto Green Lava - Double IPA 330mL Bottle ...</td>
    <td>594.0</td>
    <td>5.0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Engkanto Live It Up! Lager 330mL Bottle 4-Pack</td>
    <td>407.0</td>
    <td>5.0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Engkanto Paint Me Purple - Ube Lager 330mL Bot...</td>
    <td>543.0</td>
    <td>5</td>
    <td>1</td>
  </tr>
</table>

<div align="justify">
As a web scraping project, we focused less on producing data mainly used for data analysis. However, we can provide some information about the products.

We start by considering the prices. The cheapest beer products priced at 60 pesos are the 330 mL bottled and the 330mL canned versions of Tiger Crystal. On the other hand, the most expensive beer product is the Stella Artois 330mL Bottle Bundle of 24 priced at 3576 pesos. Next, we consider the ratings. The five beer products with the highest number of reviews are shown in the following table. The number of reviews is also indicated in the table.
</div>

<br>

<table>
  <tr>
    <th>Name</th>
    <th>Reviews</th>
  </tr>
  <tr>
    <td>Heineken 330mL 6-Pack</td>
    <td>99</td>
  </tr>
  <tr>
    <td>Crazy Carabao Variety Pack #1</td>
    <td>42</td>
  </tr>
  <tr>
    <td>Hoegaarden Rosee 750mL</td>
    <td>41</td>
  </tr>
  <tr>
    <td>San Miguel Pale Pilsen 330mL Can 6-Pack</td>
    <td>33</td>
  </tr>
  <tr>
    <td>Crazy Carabao IPA 330mL Bottle 6-Pack</td>
    <td>31</td>
  </tr>
</table>

<div align="justify">
Now, we consider the star ratings. There are 77 products with a star rating of 5. We can filter this data further by including the number of reviews. The four highest-rated beer products with at least 5 reviews are presented in the following table, including their rating and number of reviews.
</div>

<br>

<table>
  <tr>
    <th>Name</th>
    <th>Rating</th>
    <th>Reviews</th>
  </tr>
  <tr>
    <td>Pilsner Urquell 330mL Bottle Pack of 6</td>
    <td>5.0</td>
    <td>12</td>
  </tr>
  <tr>
    <td>Sapporo 330mL Bundle of 6</td>
    <td>5.0</td>
    <td>12</td>
  </tr>
  <tr>
    <td>Stella Artois 330mL Bottle Bundle of 6</td>
    <td>5.0</td>
    <td>11</td>
  </tr>
  <tr>
    <td>Paulaner Weissbier Dunkel 500mL Bottle</td>
    <td>5.0</td>
    <td>11</td>
  </tr>
</table>

<div align="justify">
Moreover, the four lowest-rated beer products are shown in the following table.
</div>

<br>

<table>
  <tr>
    <th>Name</th>
    <th>Rating</th>
    <th>Reviews</th>
  </tr>
  <tr>
    <td>Rochefort 8 330mL</td>
    <td>3.0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Royal Dutch Ultra Strong 14% 500mL</td>
    <td>3.5</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Tiger Crystal 330mL Can</td>
    <td>3.8</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Paulaner Weissbier Party Keg 5L</td>
    <td>3.8</td>
    <td>5</td>
  </tr>
</table>
~~~

## A/B Testing (and Hypothesis Testing)

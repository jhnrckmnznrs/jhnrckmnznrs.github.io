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
<img src="/assets/BeerRow.png" align="top">
</div>

<div align="justify">
The program for data scraping is shown in the Python file named 'scraper'. In this implementation, we construct a Pandas dataframe where names are stored as string, prices and ratings as floating point numbers, and number of reviews as integers. In the following figure, we see the first five observations.
</div>

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
    <td>Engkanto High Hive - Honey Ale 330mL Bottle 4-...</td>
    <td>407.0</td>
    <td>4.0</td>
    <td>5.0</td>
  </tr>
    <td>Engkanto Green Lava - Double IPA 330mL Bottle ...</td>
    <td>594.0</td>
    <td>5.0</td>
    <td>1</td>
  </tr>
    <td>Engkanto Live It Up! Lager 330mL Bottle 4-Pack</td>
    <td>407.0</td>
    <td>5.0</td>
    <td>1</td>
  </tr>
    <td>Engkanto Paint Me Purple - Ube Lager 330mL Bot...</td>
    <td>543.0</td>
    <td>5.0</td>
    <td>1</td>
  </tr>
</table>

~~~

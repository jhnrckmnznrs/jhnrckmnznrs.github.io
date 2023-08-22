+++
title = "Data Science Portfolio"
+++


## WEB SCRAPING
#### AUGUST 22, 2023

~~~

In this project, we scrape data from the beer section of the [Boozy](https://www.boozy.ph) website using the Beautiful Soup library in Python. Specifically, for each product in the said section, we extract the following:

1. Name
2. Price
3. Star Rating
4. Number of Reviews

A screenshot of the first page in the beer section of the website is shown below.

<p><img src="/assets/BeerRow.png" style="width: 100%">Screenshot taken from https://boozy.ph/collections/beer</p>

The program for data scraping is shown in the Python file named 'scraper'. In this implementation, we construct a Pandas dataframe where names are stored as string, prices and ratings as floating point numbers, and number of reviews as integers. In the following figure, we see the first five observations.

| Name | Price | Rating | No. of Reviews |
|----|----|------|--------------|
| Engkanto Mango Nation - Hazy IPA 330mL Bottle ... | 543.0 | 5.0 | 2 |
| Engkanto High Hive - Honey Ale 330mL Bottle 4-... | 407.0 | 4.0 | 5 |
| Engkanto Green Lava - Double IPA 330mL Bottle ... | 594.0 | 5.0 | 1 |
| Engkanto Live It Up! Lager 330mL Bottle 4-Pack | 407.0 | 5.0 | 1 |
| Engkanto Paint Me Purple - Ube Lager 330mL Bot... | 543.0 | 5.0 | 1 |

~~~

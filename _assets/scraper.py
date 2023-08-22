import requests
from bs4 import BeautifulSoup
import pandas as pd

baseurl = "https://www.boozy.ph/collections/beer"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'}

productname = []
productprice = []
productstar = []
productreview = []

for x in range(1, 7):
	k = requests.get('https://www.boozy.ph/collections/beer?page={}'.format(x)).text
	soup = BeautifulSoup(k, "html.parser")
	name = soup.find_all('h2', class_= 'product-name')
	price = soup.find_all('div', class_= 'product-price')
	star = soup.find_all('span', class_= 'jdgm-prev-badge__stars')
	review = soup.find_all('span', class_= 'jdgm-prev-badge__text')
	
	for i in name:
		productname.append(i.get_text().replace('\n', "").strip())
	for j in price:
		q = j.get_text().replace('\n', "").split("  ", 1)[0][1:]
		productprice.append(float(q.replace(',',"")))
	for k in star:
		productstar.append(float(k['data-score']))
	for l in review:
		z = l.get_text().replace('\n', "").split()[0]
		if z == 'No':
			z = 0
		productreview.append(int(z))
		
data = pd.DataFrame(list(zip(productname, productprice, productstar, productreview)), columns = ['Product Name', 'Price (in Philippine pesos)', 'Rating', 'Number of Reviews'])

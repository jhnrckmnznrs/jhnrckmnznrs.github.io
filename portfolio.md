+++
title = "Data Science Portfolio"
+++

# MACHINE LEARNING

## Dance-Themed Playlist Creation using Cluster Analysis
#### 21 September 2023 (Last Updated: 26 September 2023)

~~~
<div align = "justify">
(The associated codes and implementations in this project is located in the Jupyter <a href = "/assets/spotify_cluster.ipynb">notebook</a>.)
</div>
<br>
<div align = "justify">
<h2>Background</h2>
While summer already ended here in the Philippines, temperatures turn up for those in the Northern Hemisphere. There is no better time than now to hold pool and beach parties. In sync with this plans, the company has decided to host a dance party. A <a href = "/assets/spotify_cluster.csv">list</a> of tracks containing one-hundred twenty five (125) genres of Spotify music tracks was collected, with each genre containing approximately one thousand (1000) tracks. Each row represents a track that has some audio features, such as danceability and valence, associated with it. The most recent song in the playlist is released on October 2022.
</div>
<br>
<div align = "justify">
<h2>Objective</h2>
We are tasked to curate a dance-themed playlist for the party in order to create an atmosphere that will let attendees dance their hearts out.
</div>
<br>
<div align = "justify">
<h3>Data Preprocessing</h3>
To create a dance-themed playlist, a <b>cluster analysis</b> may be employed to allow grouping of 'similar' tracks. Before implementing clustering, we start by importing data as a dataframe using the <code>pandas</code> library and cleaning the data, if needed. First, we drop rows with duplicate values across all features. Next, we drop rows with duplicates on the `track_id` column as tracks have unique identifications. Lastly, we drop rows with the same album name, track name, and set of artists. Note that album and track names are not subject to trademark while an artist does. Observations with missing artists, album name, and track name are also dropped. This process is justified because we cannot add an unknown song even though its audio features are given.
</div>
<br>
<div align = "justify">
<h3>Feature Engineering</h3>
After cleaning the data, every track must associate to a unique id. Now, we can drop the `track_id` column. This process also saves memory storage.
<br>
One may argue to drop the `artists` column since artists may produce songs of different genres. Instead, the column may be replaced by the number of artists present. Observe that the artists are separated by semicolons (;).
</div>
<div align = "justify">
<h3>Dilemma</h3>
The genre feature has one hundred fourteen (114) unique values. Some categories may classify into a single group but differences still occur. For examples, J-Pop and K-Pop may be considered as pop music but they have some differences.
</div>
<br>
<div align = "justify">
<h3>Feature Selection</h3>
For now, we will not consider the track genre and use the remaining audio features. Cluster analysis are usually applied to solely continuous or categorical variables. The reason is that using, for example, Euclidean distance in clustering makes no sense for categorical variables. Mixed-type data are more common nowadays and studies uses one-hot encoding to analyze the data. For this project, we analyze using solely continuous, solely categorical, and mixed types.
</div>
<br>
<div align = "justify">
<h3>Multicollinearity</h3>
To see correlation between the features, the heatmap corresponding to the correlation coefficients is shown below. None of the features are highly correlated to each other. Danceability and valence are moderately correlated. This correlation is justified since valence representative positiveness and more positive tracks are typically danceable songs. However, we intend not to remove valence since it still differs from the danceability score.  
</div>
<br>
<div align = "justify">
<h3>Anomaly Detection</h3>
As shown from the boxplots, almost all features contains outliers or anomalies. 
</div>
<br>
<div align = "justify">
<h3>Model Selection</h3>
We must choose clustering algorithms that are insensitive to outliers. Thus, either a density-based spatial clustering of applications with noise (DBSCAN) model or Guassian mixture models (GMM). GMM are characterized by high complexity and slow convergence. Hence, we can choose to implement DBSCAN. A closely related algorithm to DBSCAN is OPTICS. It is more suitable to large datasets than DBSCAN.
</div>
<br>
<div align = "justify">
<h3>Playlist Creation</h3>
By observing the mean (or median) of the danceability score among the tracks in each cluster, we choose the cluster with the highest scores. Moreover, assuming the dance party is for adults, we remove songs with a children or kids genre. Lastly, the dance-themed playlist is completed by filtering the top 50 songs based on danceability.
</div>
~~~


## Local University Enrollment
#### 9 September 2023

~~~
<div align = "justify">
(The associated codes and implementations in this project is located in the Jupyter <a href = "/assets/enrollment.ipynb">notebook</a>.)
</div>
<br>
<div align = "justify">
You are working as a data scientist at a local University. The university started offering online courses to reach a wider range of students. The university wants you to help them understand enrollment trends. They would like you to identify what contributes to higher enrollment. In particular, whether the course type (online or classroom) is a factor.
</div>
<br>
<div align = "justify">
First, we import and clean the data. Specifically, for every column in the data, we do the following:
<ol>
<li> Check the values whether they match the description given in the table above. </li>
<li> Check number of missing values in the column. </li>
</ol>
We import <code>pandas</code> as <code>pd</code> and use the <code>read_csv</code> method to import the <a href = "https://s3.amazonaws.com/talent-assets.datacamp.com/university_enrollment_2306.csv"> dataset </a>. Then, we use the <code>head</code> method to observe the first few rows of the dataframe.
</div>
<br>
<table>
  <tr>
    <th>course_id</th>
    <th>course_type</th>
    <th>year</th>
    <th>enrollment_count</th>
    <th>pre_score</th>
    <th>post_score</th>
    <th>pre_requirement</th>
    <th>department</th>
  </tr>
  <tr>
    <td>1</td>
    <td>classroom</td>
    <td>2018</td>
    <td>165</td>
    <td>28.14</td>
    <td>73.0</td>
    <td>Beginner</td>
    <td>Science</td>
  </tr>
  <tr>
    <td>2</td>
    <td>classroom</td>
    <td>2020</td>
    <td>175</td>
    <td>79.68</td>
    <td>86.0</td>
    <td>None</td>
    <td>Science</td>
  </tr>
  <tr>
    <td>1</td>
    <td>classroom</td>
    <td>2018</td>
    <td>165</td>
    <td>28.14</td>
    <td>73.0</td>
    <td>Beginner</td>
    <td>Science</td>
  </tr>
  <tr>
    <td>3</td>
    <td>online</td>
    <td>2016</td>
    <td>257</td>
    <td>57.24</td>
    <td>80.0</td>
    <td>NaN</td>
    <td>Mathematics</td>
  </tr>
  <tr>
    <td>4</td>
    <td>online</td>
    <td>2013</td>
    <td>251</td>
    <td>97.67</td>
    <td>75.0</td>
    <td>Beginner</td>
    <td>Technology</td>
  </tr>
</table>

<div align = "justify">
We investigate the data type of the values in each column. We see that the <code>pre_score</code> is not continuous and has <code>object</code> data type. First, we use <code>fillna</code> method filling in null values with appropriate values. Only the <code>post_score</code> and <code>pre_requirement</code> columns have missing values. Also, observe that some rows in <code>pre_score</code> has a non-null value of <code>'-'</code>. Hence, we treat it as a null value and replace with a value of <code>0</code>. Finally, we convert the column's data type to <code>float</code> using the <code>astype</code> method. As a supplement, we observed that there are <code>'Math'</code> and <code>'Mathematics'</code> values in the department column. We choose the <code>'Mathematics'</code> for all rows with the <code>'Math'</code> value.
</div>
<br>
<div align = "justify">
We observe the distribution of the enrollment counts feature using the following visualization. For the plot, we shall use the Seaborn library. Notice that more than 250 enrollees are usually present. Moreover, the number of enrollees are either less than 200 or greater than 220. Lastly, the enrollment counts are not normally distributed.
</div>
<br>
<div align="center">
<img src="/assets/hist_enrol.png" align="top" width="90%">
</div>
<br>
<div align = "justify">
Now, we check if each <code>course_id</code> is unique. The number of unique ID is the same as the number of rows. Hence, no duplicate IDs are recorded in the dataset. To visualize the balance of course types, we create a countplot using Seaborn. From the plot, online courses are more offered than classroom course type. As the difference is about 900 courses, we see a class imbalance across the course types.
</div>
<br>
<div align="center">
<img src="/assets/bar_enrol.png" align="top" width="90%">
</div>
<br>
<div align = "justify">
Moreover, we can say that students tend to enroll more in online courses than in classroom-taught courses. Consider the boxplot showing the enrollment counts across the course types. The range and the median of enrollment counts for online courses are farther and greater than that of the classroom-taught courses.
</div>
<br>
<div align="center">
<img src="/assets/box_enrol.png" align="top" width="90%">
</div>
<br>
<div align = "justify">
The university wants to predict how many students will enroll in a course. This is a regression type of machine learning where the target variable is the enrollment count. For a baseline model, we shall implement a simple Linear Regression model using the scikit-learn library. For the categorical variables, we use the <code>get_dummies</code> method of <code>pandas</code>. For a comparison model, we shall implement an Elastic Net model. We choose the hyperparameter <code>alpha</code> to be equal to <code>0.0001</code>.
</div>
<br>
<div align = "justify">
We considered linear regression as a baseline model due to its simplicity and efficiency in computing. Linear regression provides a linear estimate of the relationship between the independent and the dependent variables. Moreover, the model is robust to overfitting. The loss function for the linear regression model is the ordinary least squares. In elastic net models, a loss function that puts more weight on errors is utilized. Although more complex and requires more tuning, an elastic net model is less prone to overfitting and able to select important features and handle correlated features.
</div>
<br>
<div align = "justify">
We compare the root mean squared errors (RMSE) of the two models. The RMSE for the baseline model is 0.561153419986678 while the RMSE for the Comparison Model is 0.5600931357111498. The RMSE scores are equal up to the second decimal place. Thus, we conclude that the two models perform equally the same.
</div>
~~~

## Bike Sharing Demand in South Korea
#### 20 September 2023

~~~
(The associated codes in this project is located in the Jupyter <a href = "/assets/bike_korea.ipynb">notebook</a>.)

<div align = "justify">
The dataset consists of the number of public bikes rented in Seoul's bike sharing system at each hour. It also includes information about the weather and the time, such as whether it was a public holiday.
</div>
<br>
<div align = "justify">
For data preprocessing, the column names of the dataset needs renaming as some are lengthy. For instance, the 'Dew point temperature(C)' column name is renamed as 'Dew Temp' and the 'Solar Radiation (MJ/m2)' column name is renamed as 'Solar Rad'. The dataset contains no missing values with six columns of floating point numbers, four columns of signed 64-bit integers, and four columns of string datatypes.
</div>
<br>
<div align = "justify">
Observe the barplot shown below. Summer is the season where most bikes are rented. Also, a non-holiday has a slightly better number of rented bikes compared to a holiday. The same observation holds for if the hours are considered instead of seasons. In this setting, bikes rented are high during the late afternoon to early evening hours than any other time window.
</div>
<br>
<div align = "center">
<img src = "/assets/bike_bar.png">
<img src = "/assets/bike_line.png">
</div>
<br>
<div align = "justify">
Temperature and dew point temperatures are the highly correlated features in the dataset. A principal component analysis helps mitigate correlation. Note that decision tree-based models are immune to multicollinearity.
</div>
<div align = "center">
<img src = "/assets/bike_corr.png">
</div>
<div align = "justify">
Now, we proceed to the machine learning (ML) model. ML requires numerical values for training a model. One-hot encoding is a way to turn variables from categorical into numerical. We use a decision tree to predict the number of bikes rented. The coefficient of determination score is 0.79. We also utilize a model made up of multiple decision trees. This model is called a Random Forest model. The coefficient of determination score is slightly better than the previous model. For predictions, we can use this model instead. The model considers the hour and the temperature a person rents a bike as important predictors. On the other hand, the amount of snowfall is considered the least important.
</div>
<br>
<div align = "justify">
<a href = "https://archive.ics.uci.edu/ml/datasets/Seoul+Bike+Sharing+Demand">Source</a> of dataset.
<b>Citations:</b>
<ul>
<li>Sathishkumar V E, Jangwoo Park, and Yongyun Cho. 'Using data mining techniques for bike sharing demand prediction in metropolitan city.' Computer Communications, Vol.153, pp.353-366, March, 2020</li>
<li>Sathishkumar V E and Yongyun Cho. 'A rule-based model for Seoul Bike sharing demand prediction using weather data' European Journal of Remote Sensing, pp. 1-18, Feb, 2020 </li>
</ul>
</div>
~~~

## Disaster Learning of a Machine Learning Model
#### 15 September 2023 (Last Updated: 22 September 2023)

~~~
<div align = "justify">
(The associated codes and implementations in this project is located in the Jupyter <a href = "/assets/titanic_xgb.ipynb">notebook</a>.)
</div>
<br>
<div align = "justify">
Ahoy! Kaggle is hosting a titanic machine learning <a href = "https://www.kaggle.com/competitions/titanic">competition</a> where the goal is to classify whether a passenger survives or not.
</div>
<br>
<div align = "justify">
For each passenger, the features include the following:
<ol>
<li>Ticket class <code>pclass</code>: 	<code>1</code> = 1st, <code>2</code> = 2nd, <code>3</code> = 3rd</li>
<li>Sex <code>sex</code></li>
<li>Age in years <code>Age</code></li>
<li>Number of siblings or spouses aboard <code>sibsp</code></li>
<li>Number of parents or children aboard <code>parch</code></li>
<li>Ticket Number <code>ticket</code></li>
<li>Fare <code>fare</code></li>
<li>Cabin Number <code>cabin</code></li>
<li>Port of  Embarkation <code>embarked</code> : <code>C</code> = Cherbourg, <code>Q</code> = Queenstown, <code>S</code> = Southampton</li>
<li>Passenger ID <code>PassengerId</code></li>
<li>Passenger Name <code>name</code></li>
</ol>
</div>
<br>
<div align = "justify">
To start with the classification, we preprocess the dataset. We drop the <code>PassengerId</code>, the <code>ticket</code>, and the <code>name</code> columns as they contain unique values. We replace the <code>male</code> value to 0 and the <code>female</code> value to 1 in the <code>sex</code> column to contain numerical values. Observe that the columns <code>age</code>, <code>cabin</code>, and <code>embarked</code> are the columns with missing values. By setting a threshold of 30% for dropping features, we drop the <code>cabin</code> column. The mode is used to impute the categorical feature <code>embarked</code>, while the mean is used for the numerical feature <code>age</code>. In this case, mean imputation is justified since the ages are not highly skewed, as shown in the histogram below. Lastly, a one-hot encoder is implemented on the categorical variables <code>pclass</code> and <code>embarked</code> for training purposes.
</div>
<br>
<div align = "center">
<img src="/assets/titanic_hist.png">
</div>
<br>
<div align = "justify">
None of the features are highly correlated to each other, as presented in the correlation heatmap below. However, the ages and the fares have high variances. Hence, we standardize those features by removing the mean and scaling to the unit variance. Next, we split the data where 75% comprises the training data. Now, we are ready for model training.
</div>
<br>
<div align = "center">
<img src="/assets/titanic_heatmap.png">
</div>
<br>
<div align = "justify">
We choose among the logistic regression, the k-nearest neighbors (KNN), and the gradient-boosted decision tree (GBDT) models for binary classification. Note that decision trees are usually insensitive to scaling. This means that we can use the scaled data for fitting across all models. Logistic regression are intended for linear solutions while KNN are intended for non-linear solutions. All the models with default hyperparameters give an accuracy of around 75%. To improve the models, we employ stratified k-fold cross-validation and a randomized search cross-validation for hyperparameter tuning. Both the logistic regression and the KNN models produce an accuracy close to 85% while the GBDT model produce an accuracy of 88%. Although this is a slight advantage to the other models, we choose the GBDT model for the predictions.
</div>
<br>
<div align="justify">
The data for prediction has the same features. We preprocess the data similar to the previous data. However, in this case, the <code>fare</code> column has a null value. For this feature, we impute with the median since the data is right-skewed, as shown in the histogram below. Afterwards, the similar steps follow until the fitting of data into the chosen model. We predict the survivability of the passengers and save the results as a comma-separated values (CSV) <a href = "/assets/gender_submission.csv">file</a> for submission. Upon submisison, Kaggle reveals that the predictions are 77.2% accurate.
</div>
<br>
<div align = "center">
<img src="/assets/titanic_test_hist_fare.png">
</div>
<div align="justify">
We also utilized the automated marchine learning package <a href = "https://github.com/EpistasisLab/tpot/">TPOT</a>. This package enables one to find an ML model that works well for the cleaned data. In this case, we use it to find a non-deep learning model. After execution, the best pipeline found is also an GBDT model with Gini impurity for splitting the nodes. The predictions are different from the previously generated predictions but has the same accuracy score.
</div>
<div align = "center">
<code>XGBClassifier(ZeroCount(SelectFwe(DecisionTreeClassifier(input_matrix, criterion=gini, max_depth=5, min_samples_leaf=4, min_samples_split=9), alpha=0.007)), learning_rate=0.5, max_depth=5, min_child_weight=16, n_estimators=100, n_jobs=1, subsample=0.7000000000000001, verbosity=0)</code>
</div>
~~~


# DASHBOARDS

## Listen to the Sound of a Dashboard (Spotify 2023)
#### 16 September 2023 (Last Updated: 18 September 2023)

~~~
<div align = "justify">
(The associated codes and implementations in this project is located in the Jupyter <a href = "/assets/moststreamedsongs.ipynb">notebook</a> and Power BI eXchange <a href = /assets/dashboard.pbix>file</a>.)
</div>
<br>
<div align = "justify">
For this project, we use the <a href = "https://www.kaggle.com/datasets/nelgiriyewithana/top-spotify-songs-2023">dataset</a> found in Kaggle presenting the most streamed songs in the year 2023. We showcase some SQL and Power BI skills for personal purposes. First, the data is imported in Microsoft SQL Server Management Studio. The total number of tracks is nine-hundred fifty-three (953) with six-hundred fourty five (645) distinct artists or groups of artists.
<div>
<br>
<div align = "justify">
Most of the tracks, specifically four-hundred two (402), are songs released in the year two thousand and twenty two (2022). In terms of age, the oldest track is Agudo Magico 3 by Stryx, utku INC, and Thezth released in 1930. On the other hand, the latest track is Seven by Jung Kook featuring Latto released on 14 July 2023. In terms of the number of tracks, Taylor Swift has the highest numbers of songs in the dataset with thirty-four (34) songs followed by The Weekend with twenty-two (22) songs.    
</div>
<br>
<div align = "justify">
Now, we examine the songs for the past five years. There are seven hundred sixty-nine (769) tracks mostly comprised of tracks released in 2022. In this five-year window, the tracks 'As It Was' and 'Blinding Lights' by the Weekend, are the two of the top ten songs in terms of the number of streams. Non-instrumental songs with a high danceability factor are the most streamed are preferred by listeners. The average beats per minute (bpm) is approaximately one hundred twenty-two (122), which is near the <a href = "https://www.masterclass.com/articles/how-to-find-the-bpm-of-a-song">perfect tempo considered to be a hit</a>, according to some songwriters. Lastly, as a fun observation that needs to be experimented, about fifteen percent (15%) of the songs are released in May.
</div>
<br>
<div align = "justify">
<img src="/assets/dashboard2019-2023.png" align="top" width="95%">
</div>
~~~

# STATISTICAL TESTS

## A/B Testing
#### 28 August 2023 (Last Updated: 4 September 2023)
~~~

<div align = "justify">
In this project, we conduct an A/B test using the <a href = "https://www.kaggle.com/datasets/sergylog/ab-test-useraggregated-results">Kaggle</a> data. We will use common statistical procedures outlined in the <a href = "https://vkteam.medium.com/practitioners-guide-to-statistical-tests-ed2d580ef04f#1e3b">Medium</a> article by the VK Team. Moreover, we will implement the test in Python. 
</div>
<br>
<div align = "justify">
First, we download the data saved in a CSV file and read the file using the pandas library. The data consists of the user ID, the number of views, the number of clicks, and the group where each user belongs from eighty-thousand (80,000) users. Please refer to the following table below to see the first five (5) observations. Note that the values in the column associated to the user ID are distinct. Hence, we can drop the column from the dataframe.
</div>
<br>
<table>
  <tr>
    <th>user_id</th>
    <th>group</th>
    <th>views</th>
    <th>clicks</th>
  </tr>
  <tr>
    <td>1</td>
    <td>control</td>
    <td>3.0</td>
    <td>0.0</td>
  </tr>
  <tr>
    <td>2</td>
    <td>control</td>
    <td>1.0</td>
    <td>0.0</td>
  </tr>
  <tr>
    <td>3</td>
    <td>control</td>
    <td>3.0</td>
    <td>1.0</td>
  </tr>
  <tr>
    <td>4</td>
    <td>control</td>
    <td>5.0</td>
    <td>0.0</td>
  </tr>
  <tr>
    <td>5</td>
    <td>control</td>
    <td>2.0</td>
    <td>0.0</td>
  </tr>
</table>
<br>
<div align = "justify">
Then, we inspect for missing values and inconsistent data types in each column. Using the info function from pandas, there are no null values present. The number of views and clicks are stored as 64-bit double-precision values, which expends memory storage. The minimum value for both columns is 0, while the maximum values are 21 and 206 for clicks and views, respectively. Hence, to free some memory, we convert each number of clicks as an 8-bit signed integer and each number of views as a 16-bit signed integer. We can also store each group label as a categorical data.
</div>
<br>
<div align = "justify">
We formulate a null and an alternative hypotheses for this statistical test. We choose the null hypothesis stating that "there is no significant difference between the groups" and the alternative hypothesis stating otherwise.
</div>
<br>
<div align = "justify">
To estimate the smallest sample size needed for this experiment, we choose a significance level of 0.05, a statistical power of 0.8, an allocation ratio of 1, and a minimum detectable effect of 2%. For a two sample t-test concerned on the number of clicks, the smallest sample size needed is four thousand seven hundred twenty-one (4721).
</div>
<br>
<div align = "justify">
To start with the hypothesis test, we check whether the assumptions of a t-test are satisfied or not. We can determine if the samples are normally distributed by looking at their histograms or quantile-quantile (Q-Q) plots. The following figures show the histogram for the number of clicks by the control group and the Q-Q plot for the number of clicks by the treatment group.
</div>
<div class="row">
  <div class="column">
    <img src="/assets/histogram.png" alt="Histogram" style="width:100%">
  </div>
  <div class="column">
    <img src="/assets/qqplot.png" alt="Q-Q Plot" style="width:100%">
  </div>
</div>
<div align = "justify">
Both the histogram and the Q-Q plot show that the samples are not normally distributed. Hence, we refrain from using the t-test for the hypothesis tesing. Instead, we can use the non-parametric Mann-Whitney U Test. Using this test, we obtain a p-value close to zero and less than the signifance level 0.05. Therefore, we can reject the null hypothesis and say that there is a significant difference between the models exposed to the control and the treatment groups.  
</div>
<div align = "justify">
Now, we need to define a key metric to monitor for each group. We can compare the conversion rate defined by
</div>
~~~

$$C = \dfrac{\sum_{g \in G} c_g}{\sum_{g \in G} v_g}$$

where $G$ denotes the group (control or treatment), and $c_g$ is the number of clicks and $v_g$ is the number of views for user $g \in G$.

(TO BE CONTINUED)

# WEB SCRAPING

## Scrape the Malt Extract from Your Beer
#### 22 AUGUST 2023

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
    <td>5</td>
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

# FUTURE PROJECTS

## Machine Unlearning

## Topological Image Processing

## Agricultural Topological Data Analysis

## Sports Analytics using Topological Data Analysis

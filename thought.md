+++
title = "Thought Journal"
+++

# Strangers and Struggles in a New World

#### 20 December 2024

~~~
<div align = "justify">
The first year of a PhD is a whirlwind of ideas and ambitions, where every choice shapes the trajectory of your academic journey. Writing a review paper often seems like an early milestone—a chance to showcase your grasp of the field while establishing yourself as a knowledgeable voice. Yet, for those engrossed in research, the time and effort required for a strong review can feel like a diversion from achieving tangible results.
<br><br>
A wise alternative is to prioritize the research itself. By weaving literature insights directly into the project, one can stay informed while maintaining focus on outcomes that matter. Tracking key publications and even preprints ensures you remain updated without the added pressure of formalizing findings into a standalone review. This approach channels your time into meaningful progress rather than dispersing efforts, avoiding premature proposals that might later prove challenging.
<br><br>
Every PhD journey is unique, and while a review paper might be a pivotal step for some, it is not a universal necessity. Whether you choose to dive into a review early or let it emerge naturally within your research, the goal remains the same: to contribute meaningfully to your field and community. Focus on what propels your work forward, and the rest will follow.
</div>
~~~

#### 10 November 2024

~~~
<div align = "justify">
Moving to a new country is like diving headfirst into a novel where you are barely fluent in the language, and everyone else has already read the plot. Each day, I find myself stumbling through moments of awe and confusion. Even the simplest things &#8212; directions, food labels, conversations &#8212; feel like riddles waiting to be solved. My comfort zone has become a distant memory, replaced by a world where each small interaction is a test of patience and adaptability. One month down, with possibly three years and eleven months to go. Yet I still brace myself every time I venture out to tackle the mysteries of grocery aisles or government offices. Even routine tasks like opening a bank account took nearly three weeks, leaving me to wonder if the Institute had anticipated these bureaucratic adventures in my fellowship. I would not call it entitlement, but as an MSCA Fellow, I have a right to require support for all the administrative procedures that come with being an early-stage researcher in a foreign country.
<br><br>
Then there is the research program and doctoral school &#8212; an entirely different kind of adventure. Long hours of data extraction, thanks to the computational complexity of implemented algorithm, have left me bleary-eyed. I have had a few presentations in this first month, each a fresh reminder of my own nerves and the gnawing doubt about whether I truly understand my own research. The language barrier adds yet another layer. Asking for technical help or sharing ideas with peers requires careful phrasing and humility. I second-guess my words, wondering if I have managed to communicate my thoughts clearly or if something essential has slipped through the cracks. It is a strange feeling, standing before an audience and realizing that while I am trying to bridge a language gap, I am also trying not to trip over my own words. Somehow, I will either find resilience in all this fumbling or surrender and go back to where I came from.
<br><br>
Each day, I find myself juggling between moments of optimism &#8212; trusting that I will eventually feel at home &#8212; and flashes of pessimism, wondering if I will always feel like a stranger. Let us see where this journey takes me, and decide by then whether there is still a reason, or even a glimmer of hope, to keep pursuing this doctorate degree.
</div>
~~~

# MACHINE LEARNING

## Online vs. Classroom: Which Enrollment Type is Right?
#### 9 September 2023 (Last Updated: 4 October 2023)

~~~
<div align = "justify">
(The associated codes and implementations in this project is located in the Jupyter <a href = "/assets/enrollment.ipynb">notebook</a>.)
</div>
<div align = "justify">
<h3>Background and Objective</h3>
You are working as a data scientist at a local University. The university started offering online courses to reach a wider range of students. The university wants you to help them understand enrollment trends. They would like you to identify what contributes to higher enrollment. In particular, whether the <b>course type</b> (online or classroom) is a factor.
</div>
<div align = "justify">
<h3>Executive Summary</h3>
To determine whether course type is a factor in enrollment, we analyze the enrollment counts and test our hypotheses. Furthermore, we provide a machine learning model to predict enrollment counts of future offered courses by the university. The report is divided into the following sections:
<ol>
  <li>Introduction: Overview of enrollment trends in universities offering both online and onsite courses.</li>
  <li>Data Preprocessing: Detailed explanation on data cleaning.</li>
  <li>Hypothesis Testing: Test to determine whether difference in enrollment counts is significant.</li>
  <li>Regression Model: Model to predict future enrollment trends.</li>
  <li>Conclusion: Final remarks obtained from the model experiments.</li>
</ol>
</div>
<div align = "justify">
<h3>Introduction</h3>
Enrollment trends in online courses accelerated dramatically during the COVID-19 pandemic. During the height of the pandemic, most classes moved to online-only instruction. While the effects of the pandemic has subsided, online learning remains popular, with many students choosing to take online courses or even complete entire degrees online. In hindsight, online courses offer flexibility and convenience that traditional classroom-based courses cannot. Students can take online courses at their own pace and on their own schedule, from anywhere in the world. This makes online learning a good option for students who are working full-time, have families, or live in remote areas. However, there are also some drawbacks such as the difficulty of staying motivated and engaged. Students also miss out on the social interaction and networking opportunities that are available in traditional classroom settings. It is important to note that online and onsite learning are not mutually exclusive. Many students choose to take a mix of online and onsite courses. This allows them to take advantage of the benefits of both types of learning.
</div>
<div align = "justify">
<h3>Data Preprocessing</h3>
First, we import the data and clean the data using methods and functions available in the <code>pandas</code> library. For every column, we shall do the following:
<ol>
<li> Check the number of missing values. </li>
<li> Check the values whether they match the appropriate description (or data type). </li>
</ol>
The <code>pandas</code> are imported using the alias <code>pd</code>. The <code>.read_csv</code> method imports the <a href = "https://s3.amazonaws.com/talent-assets.datacamp.com/university_enrollment_2306.csv"> dataset </a>. The <code>.head</code> method allows observation of the first few specified rows of the pandas dataframe.
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
Using the <code>.info</code> method, the data types of the features are as follows:
<ul>
  <li><code>course_type</code>: integer</li>
  <li><code>year</code>: integer</li>
  <li><code>enrollment_count</code>: string</li>
  <li><code>pre_score</code>: string</li>
  <li><code>post_score</code>: floating-point number</li>
  <li><code>pre_requirement</code>: string</li>
  <li><code>department</code>: string</li>
</ul>

For the missing values, the <code>post_score</code> and <code>pre_requirement</code> columns have 185 and 89 missing values respectively. These values are obtained using the <code>.isna</code> and <code>.sum</code> methods.
<br>
Now, we correct the data types and fill-in the missing values. The missing scores are assumed to be equal to zero (0) while the missing pre-requisitees are assumed to be empty or <code>'None'</code>. Note that some values of the pre-scores are marked as a dash. We also replace these values as 0. Afterwards, the <code>pre_score</code> column is converted as a list of floating-point numbers, similar to the <code>post_score</code>, using the <code>.astype</code> method. Lastly, the <code>'Math'</code> and <code>'Mathematics'</code> values both exist in the department column. To ensure consistency, <code>'Math'</code> values are replaced by <code>'Mathematics'</code>.
<br>
The course ID column contain unique values. This means that the number of courses is one-thousand eight hundred fifty (1850). Using the <code>.value_counts</code> method, one thousand three hundred seventy-five (1375) are online while four hundred seventy-five (475) are classroom-based.
<br>
To provide an overview of the number of courses of each type, refer to the countplot shown below. Online courses are dominant for both the departments and the university. The Technology department offered the most online courses. For succeeding visualization, we shall mainly use the Seaborn package.
</div>
<br>
<div align = "center">
<img src = "/assets/enrollment_bar.png" align="top" width="90%">
</div>
<div align = "justify">
<h3>Hypothesis Testing</h3>

Recall that we intend to compare the difference between the enrollment counts in each type of course. To start with the hypothesis testing, first observe the the distribution of the enrollment counts. Many courses attracts more than two-hundred fifty (250) enrollees. Moreover, no courses are enrolled with more than two hundred (200) or greater than two hundred twenty (220) students. Lastly, the t-test is not advised to utilize since the enrollment counts are not normally distributed.
</div>
<br>
<div align="center">
<img src="/assets/hist_enrol.png" align="top" width="90%">
</div>
<br>
<div align = "justify">
We provide more insights about the enrollment. Consider the boxplot showing the enrollment counts across the course types. Students tend to enroll more in online courses than in classroom-taught courses. The range and the median of enrollment counts for online courses are farther and greater than that of the classroom-taught courses. As a remark, no anomalies in the enrollment counts are present for both course types. 
</div>
<br>
<div align="center">
<img src="/assets/box_enrol.png" align="top" width="90%">
</div>
<br>
<div align="justify">
We proceed with the hypothesis testing using a Mann-Whitney U Test. This test is a non-parametric version of the t-test suitable for non-normally distributed data. For implementation in Python, the <code>mannwhitneyu</code> function is imported in the <code>scipy.stats</code> library. By index slicing, the enrollment counts of classroom-based courses is separated from that of the online courses. We choose a significance value of 0.01 and a null hypothesis stating that there is no significant difference between the course type. A p-value of a power of negative two hundred thirty-six (-236) is obtained. Thus, the null hypothesis is rejected and say that there is a significant difference between the course type in the enrollment.
</div>
<div align = "justify">
<h3>Regression Model</h3>
Before choosing a regression model, we look at the correlation coefficients of the features. Highly-correlated features need to be reduced as they cause bias to the model. A heatmap showing the correlation coefficients of features are shown below.
</div>
<div align ="center">
<img src= "/assets/enrollment_heatmap.png">
</div>
<br>
<div align = "justify">
We employ a regression model to predict the enrollment count of a course offering. For a baseline model, a simple Linear Regression model is implemented using the <code>scikit-learn</code> library. Linear regression is a good baseline model due to its simplicity and computing efficiency. It is also robust to overfitting. For a comparison model, we shall implement the Elastic Net model, which is also less prone to overfitting. In this model, the loss function puts more weight on errors is utilized. Additionally, an elastic net model is able to select important features and handle correlated features.
<br>
For feature training, the target variable <code>enrollment_count</code> is dropped from the set of features. The categorical variables are one-hot encoded to using the <code>.get_dummies</code> method of <code>pandas</code>.
</div>
<br>
<div align = "justify">
We choose the learning rate of the elastic net equal to <code>0.0001</code>. After predicting the enrollment counts of a testing subset, the root mean-squared error (RMSE) on the testing set from the baseline model is 0.31489320802667325 while the RMSE for the comparison model is 0.3241052888644588. In this case, we conclude that the two models perform equally the same.
</div>
<br>
<div align = "justify">
Alternatively, we use the automated machine library TPOT to find a suitable model. This process may be beneficial especially when there are no time constraints in releasing a pipeline. Using the <code>TPOTRegressor</code> from TPOT, the best <a href = "/assets/enrollment_pipeline.py">pipeline</a> is as follows:
<ol>
  <li><code>SelectPercentile</code>: Keep eighty-four percent (84%) of the features based on percentile scores</li>
  <li><code>StandardScaler</code>: Standardize features by removing the mean and scaling to unit variance.</li>
  <li><code>Binarizer</code>: Binarize features with 0.55 as threshold.</li>
  <li><code>RobustScaler</code>: Scale features that are robust to outliers.</li>
  <li><code>MaxAbsScaler</code>: Scale each feature by its maximum absolute value.</li>
  <li><code>LassoLarsCV</code>: Cross-validated L1 regularization using the least-angle regression algorithm</li>
</ol>
The root mean square error of the pipeline is 0.3135939840712398, which performs the same as the initial models.
</div>
<div align = "justify">
<h3>Conclusion</h3>
Therefore, we choose any model for deployment and observing more differences once new data are obtained. Note that any model is a good choice since the predictions on the holdout set roughly off by one (1) enrollee.
</div>
~~~

## Machine Learning for Loan Approval: A Balancing Act Between Accuracy and Fairness
#### 27 September 2023 (Last Updated: 4 October 2023)

~~~
<div align = "justify">
(The associated codes and implementations in this project is located in the Jupyter <a href = "/assets/loan.ipynb">notebook</a>.)
</div>
<div align = "justify">
<h3>Background and Objective</h3>
A start-up company wants to automate loan approvals by building a classifier to predict whether a loan will be paid back. In this situation, it is more important to accurately predict whether a loan will not be paid back rather than if a loan is paid back. Your manager will want to know how you accounted for this in training and evaluation your model. As a machine learning scientist, we need to build the classifier and prepare a report accessible to a broad audience.
</div>
<div align = "justify">
<h3>Executive Summary</h3>
To determine whether a loan will be paid back, we analyze the important features of a borrower, such as the credit score, the number of public derogatory records, and others. In this scenario, we provide a machine learning model for the classification. The report is divided into the following sections:
<ol>
  <li>Introduction: Overview of loan repayment and factors affecting the failure of non-repayment.</li>
  <li>Data Preprocessing: Detailed explanation on data cleaning.</li>
  <li>Feature Engineering: Extract or select features to train in the classifier.</li>
  <li>Classifier: Model to classify loan repayments.</li>
  <li>Conclusion: Final remarks obtained from the model experiments.</li>
</ol>
</div>
<div align = "justify">
<h3>Introduction</h3>
The repayment rate of loans is influenced by a variety of factors, including the borrower's creditworthiness, the type of loan, and the economic climate. Studies found that borrowers with higher credit scores are more likely to repay their loans on time and in full. Furthermorele, student loans are typically repaid at a lower rate than other types of loans, such as personal loans or auto loansLastinally, the economic climate can also affect the loan repayment rate. During economic downturns, borrowers may be more likely to default on their loans due to job loss or other financial difficult of defaults.
</div>
<div align = "justify">
<h3>Data Preprocessing</h3>
<div align = "justify">
The <a href="/assets/loan_data.csv">dataset</a> contains information mainly about the borrower, such as the credit score and the status of payment. For a complete list of features, observe the table provided below.
</div>
<br>
<div align = "center">
<table>
<thead>
<tr>
<th style="text-align:right"></th>
<th style="text-align:left">Variable</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">0</td>
<td style="text-align:left">credit_policy</td>
<td style="text-align:left">1 if the customer meets the credit underwriting criteria; 0 otherwise.</td>
</tr>
<tr>
<td style="text-align:right">1</td>
<td style="text-align:left">purpose</td>
<td style="text-align:left">The purpose of the loan.</td>
</tr>
<tr>
<td style="text-align:right">2</td>
<td style="text-align:left">int_rate</td>
<td style="text-align:left">The interest rate of the loan (more risky borrowers are assigned higher interest rates).</td>
</tr>
<tr>
<td style="text-align:right">3</td>
<td style="text-align:left">installment</td>
<td style="text-align:left">The monthly installments owed by the borrower if the loan is funded.</td>
</tr>
<tr>
<td style="text-align:right">4</td>
<td style="text-align:left">log_annual_inc</td>
<td style="text-align:left">The natural log of the self-reported annual income of the borrower.</td>
</tr>
<tr>
<td style="text-align:right">5</td>
<td style="text-align:left">dti</td>
<td style="text-align:left">The debt-to-income ratio of the borrower (amount of debt divided by annual income).</td>
</tr>
<tr>
<td style="text-align:right">6</td>
<td style="text-align:left">fico</td>
<td style="text-align:left">The FICO credit score of the borrower.</td>
</tr>
<tr>
<td style="text-align:right">7</td>
<td style="text-align:left">days_with_cr_line</td>
<td style="text-align:left">The number of days the borrower has had a credit line.</td>
</tr>
<tr>
<td style="text-align:right">8</td>
<td style="text-align:left">revol_bal</td>
<td style="text-align:left">The borrower&#39;s revolving balance (amount unpaid at the end of the credit card billing cycle).</td>
</tr>
<tr>
<td style="text-align:right">9</td>
<td style="text-align:left">revol_util</td>
<td style="text-align:left">The borrower&#39;s revolving line utilization rate (the amount of the credit line used relative to total credit available).</td>
</tr>
<tr>
<td style="text-align:right">10</td>
<td style="text-align:left">inq_last_6mths</td>
<td style="text-align:left">The borrower&#39;s number of inquiries by creditors in the last 6 months.</td>
</tr>
<tr>
<td style="text-align:right">11</td>
<td style="text-align:left">delinq_2yrs</td>
<td style="text-align:left">The number of times the borrower had been 30+ days past due on a payment in the past 2 years.</td>
</tr>
<tr>
<td style="text-align:right">12</td>
<td style="text-align:left">pub_rec</td>
<td style="text-align:left">The borrower&#39;s number of derogatory public records.</td>
</tr>
<tr>
<td style="text-align:right">13</td>
<td style="text-align:left">not_fully_paid</td>
<td style="text-align:left">1 if the loan is not fully paid; 0 otherwise.   </td>
</tr>
</tbody>
</table>
</div>
<div align = "justify">
<a href="https://www.kaggle.com/itssuru/loan-data">Source</a> of dataset.
</div>
<br>
<div align = "justify">
Using the <code>.info</code> method, the data has no null values and the features are set to the appropriate data type. Moreover, the purpose column needs no improvement as it contains unique and justified values. For the classifier, the target variable is the not.fully.paid feature. Note that there is class imbalance as there are fewer examples of loans not fully paid. Specifically, eight thousand forty-five (8045) are fully paid while one thousand five hundred thirty-three (1533) are not. This is important to note since machine learning classifiers tend to underperform when class imbalance exists.
<div align = "justify">
<h3>Feature Engineering</h3>
The heatmap of the correlation matrix between the numeric features are shown below. It is shown that FICO credit score and the interest rate are highly correlated. This is justified since FICO credit scoreare used by lenders to determine thes interest rate on loan. We opt to retain the weak to moderately correlated features. It is also possible that the features are too many. The classifier must also be fitted on a training data with a lower dimension. Dimensionality reduction is implemented using the Principal Component Analysis (PCA). By reducing the dimension to two (2), the features explains 99.9% of the variance.
<br>
For the categorical variable purpose, a one-hot encoding is applied to create a binary matrix.
</div>
<br>
<div align="center">
<img src="/assets/loan_corr.png" align="top" width="90%">
</div>
<div align = "justify">
<h3>Classifier</h3>
We use an extreme grandient-boosted (XGBoost) tree classifier for this situation. A gradient boosted tree classifier utiilizes an ensemble of decision trees to make predictions. In addition, XGBoost is a specific implementation of a gradient boosted tree classifier that is popular due to its speed, scalibility, and accuracy. Note that the manager wants to accurately predict if a loan will not be paid back. Since <code>1</code> is the value for a loan not getting paid back, the recall score is the metric that the manager prefers to see. For this model, the recall on the testing set is 10% which means that the model has a high accuracy on determining loans that will not be paid back. When the model is trained on a data whose dimension is reduced using PCA, the recall drops significantly. Hence, PCA does not help in this case.
</div>
<br>
<div align = "justify>
Now, due to the class imbalance, a Synthetic Minority Over-sampling Technique (SMOTE) may be implemented to balance the two classes. The model obtained a 91% and 89% recall on the training and testing set respectively, which is a better performance than the previous two models.
<br>
Using an automated machine library like TPOT, an optimized <a href = "/assets/tpot_loan.py>"pipieline</a> found is also a gradient-boosted tree classification model applied on the features scaled on a particular range. Looking at the recall scores when the pipeline is fitted on the original, the recall scores are 100% and 10% on the training and the testing sets respectively. This is clearly a case of underfitting. Now, applying the pipeline on the synthetically-balanced data, the recall scores are 100% and 86% on the training and the testing sets respectively. Again, the model performs better on the balanced data than on the original data.
</div>
<div align = "justify">
<h3>Conclusion</h3>
In this case, due to running time and near recall scores on training and testing sets, the XGBoost Classifier is a good choice for finding loan application that will not be paid back due to its high score. 
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

# Fitness Stats
This is a demonstration of data visualization using d3.js. There is a filter function that allows the user to switch
what variables appear on the graph.
## Technologies 
- React
- Vite
- HTML
- CSS
- CSV (data set from here)[https://www.kaggle.com/datasets/nadeemajeedch/fitness-tracker-dataset/data]
- d3.js
## Features 
- d3 scatterplot function
- state variables
- reading from an SVG
## The Process 
I had to clean up the data a little bit because there were some missing values. I then constructed the graph using
static values, then added state so that the graph would be updated by the user.
## What I Learned 
I have some d3 experience but in this project I learned how to adapt it for use in React. 
Initially I had an issue with the updated graph being drawn on top of the old graph but I was able to solve the issue
by clearning the graph before every rerender. 
## What Could Be Improved 
I think the graph component could be broken down into another component or a custom hook
## Demonstration    
![Screenshot](fitness-stats-phi.vercel.app_(1).png)




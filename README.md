## To Do
- [x] create a dummy summary  
- [x] decide exactly what the graph should show. 
  - [x] what should be on the x axis? What should be on the y axis?  
  - [x] what should be filtered?  
- [x] create a dummy filter section. 
- [ ] implement graph. 
  - [x] scatter plot  
  - [x] use Average_BPM and Calories_Burned as initial values. 
  - [x] only include Weight (kg),Height (m),Max_BPM,Avg_BPM,Resting_BPM,Session_Duration (hours),Calories_Burned,Fat_Percentage,BMI  
  - [x] add axis lables
- [x] implement filters. 
  - [x] when one value is selected, update the graph  
- [ ] implement summary. 
- [ ] make everything look nice. 
- [ ] stretch goals. 
  - [!] make sure if A is selected for the x-axis is can't be selected on the y-axis
  - [x] why is my graph being rendered twice?
### Next Time
Solve multi-graph issue:  
clear the SVG before drawing in the effect and add cleanup.
## What I've learned
If vite is not recognized when you run `npm run dev` and you have cloned the repository this is because the node module folder hasn't been build yet. Run `npm install` first.  
I don't think I can work on this project on my Windows PC because I created it on my Mac.
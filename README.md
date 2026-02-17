# playwright-projects

we can limit the  workers : npx playwright test tests --workers 4 --> it will run with 4 workers 

worker 1 --> it will run in sequential 

allure setup
npm i -D @playwright/test allure-playwright

npm i -D allure-commandline

in config --> reporter give allure-playwright

the run thetest - npx playwright test

clean is to clean the existing report 
this command is used to generate a allure report 
now allure results are generated : 
npx allure generate allure-results --clean  
npx allure open 

or npx allure generate allure-results --clean ; npx allure open


after this command the allure report is generated 

to view trace : trace.playwight.dev

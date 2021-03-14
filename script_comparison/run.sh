printf "\nRunning Shell Script"
time for run in {1..10}; do sh ./a.sh > /dev/null; done
printf "\nRunning JavaScript"
time for run in {1..10}; do node a.js > /dev/null; done
printf "\nRunning Python Script"
time for run in {1..10}; do py a.py > /dev/null; done

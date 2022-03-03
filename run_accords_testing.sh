NODE_ENV=test
# npx next build | tee ./testing_logs/$(date +"%Y-%m-%d---%H-%M-%S").log

npx next build 2> >(tee ./testing_logs/$(date +"%Y-%m-%d---%H-%M-%S").stderr.tsv) 1> >(tee ./testing_logs/$(date +"%Y-%m-%d---%H-%M-%S").stdout.tsv)
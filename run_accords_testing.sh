export ENABLE_TESTING_LOG=true
npx next build 2> >(tee ./testing_logs/$(date +"%Y-%m-%d---%H-%M-%S").stderr.tsv) 1> >(tee ./testing_logs/$(date +"%Y-%m-%d---%H-%M-%S").stdout.tsv)

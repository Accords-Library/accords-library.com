NODE_ENV=test
npx next build |& tee ./testing_logs/$(date +"%Y-%m-%d---%H-%M-%S").log
role :web, "forge-secondary.davegieger.com"
role :app, "forge-secondary.davegieger.com"
role :db, "forge-secondary.davegieger.com", :primary => true

set :deploy_to, "/home/forge/www.eatsleepridegreatdivide.com/"

set :branch, "master"


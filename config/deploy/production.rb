set :stage, :production

server "genesis.davegieger.com", user: "forge", roles: %w{app db web}

set :deploy_to, "/home/forge/www.eatsleepridegreatdivide.com/"
set :branch, "16-cleanup-reduce-complexity-for-easier-server-migration-and-maintenance"

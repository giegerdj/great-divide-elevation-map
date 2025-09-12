set :stage, :production

server "genesis.davegieger.com", user: "forge", roles: %w{app db web}

set :deploy_to, "/home/forge/www.eatsleepridegreatdivide.com/"
set :branch, "main"

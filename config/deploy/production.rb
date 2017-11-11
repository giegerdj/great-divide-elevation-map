role :web, "p.davegieger.com"
role :app, "p.davegieger.com"
role :db, "p.davegieger.com", :primary => true

set :deploy_to, "/var/www/html/master/great-divide-elevation-map/"

ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "prod_deploy_rsa")]

set :branch, "master"


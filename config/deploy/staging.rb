role :web, "s.davegieger.com"
role :app, "s.davegieger.com"
role :db, "s.davegieger.com", :primary => true

set :deploy_to, "/var/www/html/great-divide-elevation-map/"

ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "staging_deploy_rsa")]

set :branch, "develop"


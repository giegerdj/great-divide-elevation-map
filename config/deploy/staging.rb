role :web, "s.davegieger.com"
role :app, "s.davegieger.com"
role :db, "s.davegieger.com", :primary => true

set :deploy_to, "/var/www/html/staging/td-2015-map/"

ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "staging_deploy_dsa")]

set :branch, "develop"


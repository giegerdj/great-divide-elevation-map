# config valid for current version and patch releases of Capistrano
lock "~> 3.18.0"

set :application, "eatsleepridegreatdivide"
set :repo_url, "git@github.com:giegerdj/great-divide-elevation-map.git"

set :ssh_options, {
    forward_agent: true,
    keys: [File.join(ENV["HOME"], ".ssh", "forge_rsa")]
}

set :keep_releases, 5

before "deploy:symlink:release", "app:assets"

after "deploy:published", "deploy:restart"
after "deploy:published", "sys:restart_php_fpm"

namespace :app do
    desc "Compile web assets locally and send to the server"
    task :assets do
        branch = fetch(:branch)
#         system("find public/assets/build/ -mindepth 1 ! -name '.gitignore' -exec rm -rf {} +")
        system("git checkout #{branch} && npm install && npm run build") or raise "Could not compile static assets"
        on roles(:app, :web) do
           upload! "public/assets/build", "#{release_path}/public/assets/", recursive: true
        end
    end
end

namespace :sys do
    desc "Restart php8.2-fpm"
    task :restart_php_fpm do
        on roles(:app, :web) do
            execute "sudo service php8.2-fpm restart"
        end
    end
end

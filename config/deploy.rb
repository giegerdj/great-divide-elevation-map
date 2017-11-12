set :application, "Great Divide Elevation Map"

set :scp, :git
set :repository, "git@github.com:giegerdj/great-divide-elevation-map.git"

require "capistrano/ext/multistage"
set :stages, ["staging","production"]

set :default_stage, "staging"

set :ssh_options, {
    :user =>  "www-data",
    :forward_agent => true
}

set :deploy_via, :remote_cache
set :use_sudo, false


set :deploy_via, :remote_cache
set :use_sudo, false

set :copy_exclude, [".git/"]

set :keep_releases, 10

after "deploy:setup",
        "ep:setup",
        "laravel:setup",
        "ep:config"


#this happens before the 'current' symlink is changed to the newest release
before "deploy:create_symlink",
        "ep:symlinks",
        "laravel:symlinks",
        "laravel:file_permissions",
        "ep:finalize"

#this happens after the 'current' symlink is changed to the proper release
#in a normal deploy AND rollback
after "deploy:restart",
        "laravel:cache_clear",
        "laravel:view_clear",
        "laravel:config_cache"

after "deploy:update", "deploy:cleanup"

namespace :ep do
    desc "setup custom files"
    task :setup, :roles => :app do

    end

    desc "symlink custom files"
    task :symlinks, :roles => :app do

    end

    desc "Create config file"
    task :config, :roles => :app do

        set(:app_env, Capistrano::CLI.ui.ask("App Env: ") )
        set(:app_secret_key, Capistrano::CLI.ui.ask("App Secret Key (32 chars): ") )
        set(:app_url, Capistrano::CLI.ui.ask("App URL: ") )

        db_config = ERB.new <<-EOF
APP_ENV=#{app_env}
APP_KEY=#{app_secret_key}
APP_URL=#{app_url}

DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=memcached
SESSION_DRIVER=file
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=

EOF

        put db_config.result, "#{shared_path}/.env"
    end

    desc "Touch up code before current symlink is changed"
    task :finalize, :roles => :app do
        run "composer --working-dir=#{release_path} install --quiet"

        run_locally("git checkout #{branch} && gulp --production")
        upload("public/build", "#{release_path}/public/", :via => :scp, :recursive => true, :roles => :web)

        # run "if $(php #{release_path}/artisan migrate:status | grep --quiet 'No migrations found'); then php #{release_path}/artisan migrate:install; fi"
        # run "php #{release_path}/artisan migrate --force"
    end

end

namespace :laravel do
    desc "Create files and directories for Laravel environment"
    task :setup, :roles => :app do
        run "mkdir -p #{shared_path}/bootstrap/cache/"
        run "mkdir -p #{shared_path}/storage/app/"
        run "mkdir -p #{shared_path}/storage/framework/cache/"
        run "mkdir -p #{shared_path}/storage/framework/sessions/"
        run "mkdir -p #{shared_path}/storage/framework/views/"
        run "mkdir -p #{shared_path}/storage/logs/"

    end


    desc "Set up symlinks for the Laravel app"
    task :symlinks, :roles => :app do
        run "ln -nfs #{shared_path}/.env                            #{release_path}/.env"
        run "ln -nfs #{shared_path}/bootstrap/cache                 #{release_path}/bootstrap/cache"
        run "ln -nfs #{shared_path}/storage/app                     #{release_path}/storage/app"
        run "ln -nfs #{shared_path}/storage/framework/cache         #{release_path}/storage/framework/cache"
        run "ln -nfs #{shared_path}/storage/framework/sessions      #{release_path}/storage/framework/sessions"
        run "ln -nfs #{shared_path}/storage/framework/views         #{release_path}/storage/framework/views"
        run "ln -nfs #{shared_path}/storage/logs                    #{release_path}/storage/logs"

    end

    desc ""
    task :file_permissions, :roles => :app do
        run "find -L #{latest_release}/public/ -type d -exec chmod 750 {} \\;"
        run "find -L #{latest_release}/public/ -type f -exec chmod 640 {} \\;"

    end

    desc "Create the migration repository"
    task :migrate_install, :roles => :app do
        run "php #{current_path}/artisan migrate:install"
    end

    desc "Run the database migrations"
    task :migrate, :roles => :app do
        run "php #{current_path}/artisan migrate:install --quiet"
        run "php #{current_path}/artisan migrate --force"
    end

    desc "Rollback the last database migration"
    task :migrate_rollback, :roles => :app do
        run "php #{current_path}/artisan migrate:rollback"
    end

    desc "Show the status of each migration"
    task :migrate_status, :roles => :app do
        run "php #{current_path}/artisan migrate:status"
    end

    desc "Remove the route cache file"
    task :route_clear, :roles => :app do
        run "php #{current_path}/artisan route:clear"
    end

    desc "Create a route cache file for faster route registration"
    task :route_cache, :roles => :app do
        run "php #{current_path}/artisan route:clear"
        run "php #{current_path}/artisan route:cache --quiet"
    end

    desc "Flush the application cache"
    task :cache_clear, :roles => :app do
        run "php #{current_path}/artisan cache:clear"
    end

    desc "Put the application into maintenance mode"
    task :down, :roles => :app do
        run "php #{current_path}/artisan down"
    end

    desc "Bring the application out of maintenance mode"
    task :up, :roles => :app do
        run "php #{current_path}/artisan up"
    end

    desc "Clear all compiled view files"
    task :view_clear, :roles => :app do
        run "php #{current_path}/artisan view:clear"
    end

    desc "Remove the configuration cache file"
    task :config_clear, :roles => :app do
        run "php #{current_path}/artisan config:clear"
    end

    desc "Create a cache file for faster configuration loading"
    task :config_cache, :roles => :app do
        run "php #{current_path}/artisan config:clear"
        run "php #{current_path}/artisan config:cache"
    end

    desc "Optimize the framework for better performance"
    task :optimize, :roles => :app do
        run "php #{current_path}/artisan clear-compiled"
        run "php #{current_path}/artisan optimize"
    end

    desc "Remove the compiled class file"
    task :clear_compiled, :roles => :app do
        run "php #{current_path}/artisan clear-compiled"
    end

    desc "Tail laravel logs"
    task :logs, :roles => :app do
        trap("INT") { puts 'Interupted'; exit 0; }
        run "tail -f #{shared_path}/storage/logs/*.log" do |channel, stream, data|
            puts "#{channel[:host]}: #{data}"
            break if stream == :err
        end
    end
end


namespace :sys do

    desc "Composer install"
    task :composer_install, :roles => :app do
        run "composer --working-dir=#{current_path} install"
    end

    desc "Compile and upload assets"
    task :upload_assets do
        run_locally("git checkout #{branch} && gulp --production")
        upload("public/build/", "#{current_path}/public/", :via => :scp, :recursive => true, :roles => :web)
    end


end

